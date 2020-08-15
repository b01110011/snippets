'use strict'

const { v4: uid } = require('uuid')

const Entity = use('App/Models/Entity')
const Drive = use('Drive')

class EntityGalleryController
{
    async index({ request, response, view }) {}

    async create({ request, response, view }) {}

    async store({ request, params })
    {
        const entity = await Entity.findOrFail(params.entities_id)

        let sort = await entity.gallery().getCount()

        const pathLoad = `/uploads/entities/${params.entities_id}/`
        const pathLoadGallery = pathLoad + 'gallery/'

        // загрузка галереи
        let gallery = request.input('gallery')
        for (let key in gallery)
        {
            let imageFilepath = pathLoadGallery + `${uid()}.${gallery[key].image.extname}`
            await Drive.move(gallery[key].image.tmpPath, imageFilepath.slice(1))

            gallery[key].image = imageFilepath
            gallery[key].sort = sort++
        }

        const entityGallery = await entity.gallery().createMany(gallery)

        return entityGallery
    }

    async show({ params, request, response, view }) {}

    async edit({ params, request, response, view }) {}

    async update({ params, request, response }) {}

    async destroy({ params, response })
    {
        const entity = await Entity.findOrFail(params.entities_id)
        
        const gallery = await entity.gallery().where('id', params.id).firstOrFail()

        await Drive.delete(gallery.image.slice(1))

        await gallery.delete()

        // пересортировка
        let sort = await entity.gallery().orderBy('sort').fetch()
        sort = sort.toJSON()
        
        sort = sort.map((item, index) =>
        ({
            id: item.id,
            sort: index,
        }))

        for (let key in sort)
        {
            await entity.gallery().where('id', sort[key].id).update({ sort: sort[key].sort })
        }

        return response.ok()
    }

    async sort({ params, request, response })
    {
        const entity = await Entity.findOrFail(params.entities_id)

        const { sort } = request.only(['sort'])

        for (let key in sort)
        {
            await entity.gallery().where('id', sort[key].id).update({ sort: sort[key].sort })
        }

        return response.ok()
    }
}

module.exports = EntityGalleryController