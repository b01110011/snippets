'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { v4: uid } = require('uuid')

const Entity = use('App/Models/Entity')
const Region = use('App/Models/Region')
const Metro = use('App/Models/Metro')
const Drive = use('Drive')

/**
 * Resourceful controller for interacting with entities
 */
class EntityController
{
    /**
     * Show a list of all entities.
     * GET entity
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request })
    {
        let entities

        let { popular } = request.only(['popular'])

        if (popular == 1)
        {
            entities = await Entity.query()
                                    .with('region')
                                    .with('metro')
                                    .where('popular', true)
                                    .fetch()
        }
        else
        {
            entities = await Entity.query()
                                    .with('region')
                                    .with('metro')
                                    .fetch()
        }

        return entities
    }

    /**
     * Create/save a new entity.
     * POST entity
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request })
    {
        const data = request.only(['name', 'region_id', 'metro_id'])
        
        await Region.findOrFail(data.region_id)
        if (data.metro_id) await Metro.findOrFail(data.metro_id)
        
        const entity = await Entity.create(data)

        const pathLoad = `/uploads/entities/${entity.id}/`

        // загрузка фото
        let photo = request.file('photo')
        let photoFilepath = pathLoad + `${uid()}.${photo.extname}`

        await Drive.move(photo.tmpPath, photoFilepath.slice(1))
        
        entity.photo = photoFilepath

        await entity.save()

        return entity
    }

    /**
     * Display a single entity.
     * GET entity/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params })
    {
        let entity
        if (/^\d+$/.test(params.id))
        {
            entity = await Entity.findOrFail(params.id)
        }
        else
        {
            entity = await Entity.findByOrFail('path', params.id)
        }

        await entity.loadMany(
        {
            apartment_layouts: builder => builder.orderBy('sort'),
            gallery: builder => builder.orderBy('sort'),
            developer: null,
            region: null,
            metro: null,
            interior: null,
        })
        
        return entity
    }

    /**
     * Update entity details.
     * PUT or PATCH entity/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request })
    {
        const entity = await Entity.findOrFail(params.id)

        const data = request.only(['name', 'region_id', 'metro_id'])

        await Region.findOrFail(data.region_id)
        if (data.metro_id) await Metro.findOrFail(data.metro_id)

        const pathLoad = `/uploads/entities/${params.id}/`

        // загрузка фото
        let photo = request.file('photo')
        if (photo)
        {
            let photoFilepath = pathLoad + `${uid()}.${photo.extname}`
            await Drive.move(photo.tmpPath, photoFilepath.slice(1))
            data.photo = photoFilepath
            await Drive.delete(entity.photo.slice(1))
        }

        if (!data.metro_id) await entity.metro().dissociate()
        
        entity.merge(data)

        await entity.save()

        return entity
    }

    /**
     * Delete a entity with id.
     * DELETE entity/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, response })
    {
        const entity = await Entity.findOrFail(params.id)

        const pathLoad = `/uploads/entities/${params.id}/`
        await Drive.delete(pathLoad.slice(1))

        await entity.delete()

        // пересортировка
        let sort = await Entity.query().orderBy('sort').fetch()
        sort = sort.toJSON()
        
        sort = sort.map((item, index) =>
        ({
            id: item.id,
            sort: index,
        }))

        for (let key in sort)
        {
            await Entity.query().where('id', sort[key].id).update({ sort: sort[key].sort })
        }

        return response.ok()
    }

    async sort({ params, request, response })
    {
        const { sort } = request.only(['sort'])

        for (let key in sort)
        {
            await Entity.query().where('id', sort[key].id).update({ sort: sort[key].sort })
        }

        return response.ok()
    }

    async popular({ params, request, response })
    {
        const entity = await Entity.findOrFail(params.id)

        let popular = request.input('popular')

        entity.popular = popular
        await entity.save()

        return response.ok()
    }
}

module.exports = EntityController