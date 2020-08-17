import { formdata } from '~/mixins/formdata'
import { v4 as uid } from 'uuid'
import _ from 'lodash'

const byDefault =
{
    entity:
    {
        id: 0,
        path: '',
        name: '',
        floor_min: 0,
        floor_max: 0,
        deadline: '',
        price: 0,
        metro_ids: [],
        interior_ids: [],
        region_id: null,
        developer_id: null,
        responsible_id: null,
    },
    location:
    {
        location: [],
    },
    locationDescription:
    {
        location_description: '',
    },
    photo:
    {
        photo: null,
    }
}

export const state = () =>
({
    entities: [],
    entity: _.cloneDeep(byDefault.entity),
    location: _.cloneDeep(byDefault.location),
    locationDescription: _.cloneDeep(byDefault.locationDescription),
    photo: _.cloneDeep(byDefault.photo),
})

export const mutations =
{
    entities(state, entities)
    {
        state.entities = entities
    },
    entity(state, { data, entity = 'entity' })
    {
        for (let key in data)
        {
            if (key in state[entity])
            {
                state[entity][key] = data[key]
            }
        }
    },
    create(state, entity)
    {
        state.entities.push(entity)
    },
    update(state, entity)
    {
        let index = state.entities.findIndex(item => item.id == entity.id)
        state.entities.splice(index, 1, entity)
    },
    delete(state)
    {
        state.entities = state.entities.filter(item => item.id != state.entity.id)
    },
    clear(state, { entity = 'entity' })
    {
        state[entity] = _.cloneDeep(byDefault[entity])
    },
    clearAll(state)
    {
        for (let entity in byDefault)
        {
            state[entity] = _.cloneDeep(byDefault[entity])
        }
    },
}

export const actions =
{
    async entities({ commit })
    {
        const entities = await this.$axios.$get('/newbuildings')
        commit('entities', entities)
    },
    async entity({ commit }, { id, update = false })
    {
        const entity = await this.$axios.$get(`/newbuildings/${id}`)
        update ? commit('update', entity) : commit('entity', { data: entity })
    },
    async create({ state, commit, dispatch })
    {
        try
        {
            const data =
            {
                ...state.entity
            }

            if (!data.floor_max) delete data.floor_max
            if (!data.responsible_id) delete data.responsible_id
            if (!data.metro_ids.length) delete data.metro_ids

            const entity = await this.$axios.$post('/newbuildings', data)
            commit('create', entity)
            dispatch('snackbar', 'Новостройка успешно добавлена!', { root: true })
            // this.$router.push(`/admin/newbuildings/${newbuilding.id}`)
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
    async update({ state, commit, dispatch })
    {
        try
        {
            const data =
            {
                ...state.entity
            }

            if (!data.floor_max) delete data.floor_max
            if (!data.responsible_id) delete data.responsible_id
            if (!data.metro_ids.length) delete data.metro_ids

            const entity = await this.$axios.$put(`/newbuildings/${state.entity.id}`, data)
            commit('update', entity)
            dispatch('snackbar', 'Новостройка успешно отредактирована!', { root: true })
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
    async delete({ state, commit })
    {
        try
        {
            await this.$axios.$delete(`/newbuildings/${state.entity.id}`)
            commit('delete')
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
    async sort({ state, dispatch })
    {
        try
        {
            let sort = state.entities.map((item, index) =>
            ({
                id: item.id,
                sort: index,
            }))

            sort = { sort }

            await this.$axios.$post(`/newbuildings/sort`, sort)
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },

    // активация новостройки
    async active({ state, commit, dispatch })
    {
        try
        {
            let entity = state.entities.find(item => item.id == state.entity.id)
            let active = !entity.active

            await this.$axios.$post(`/newbuildings/${state.entity.id}/active`, { active })
            commit('update', { ...entity, active })
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },

    // популярные новостройки
    async popular({ state, commit, dispatch })
    {
        try
        {
            let entity = state.entities.find(item => item.id == state.entity.id)
            let popular = !entity.popular

            await this.$axios.$post(`/newbuildings/${state.entity.id}/popular`, { popular })
            commit('update', { ...entity, popular })
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },

    // расположение новостройки
    async location({ state, commit, dispatch })
    {
        try
        {
            let entity = state.entities.find(item => item.id == state.entity.id)

            const data =
            {
                ...state.location
            }

            const response = await this.$axios.$put(`/newbuildings/${state.entity.id}/location`, data)
            commit('update', { ...entity, location: response.location })
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },

    // описание расположения
    async newbuildingLocationDescription({ state, commit, dispatch })
    {
        try
        {
            let entity = state.entities.find(item => item.id == state.entity.id)

            const data =
            {
                ...state.locationDescription
            }

            const response = await this.$axios.$put(`/newbuildings/${state.entity.id}/location-description`, data)
            commit('update', { ...entity, location_description: response.location_description })
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },

    // главное фото новостройки
    async photo({ state, commit, dispatch })
    {
        try
        {
            let entity = state.entities.find(item => item.id == state.entity.id)

            const data =
            {
                ...state.photo
            }

            const response = await this.$axios.$put(`/newbuildings/${state.entity.id}/photo`, formdata(data))
            commit('update', { ...entity, photo: response.photo, photo_middle: response.photo_middle, photo_map: response.photo_map, })
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
}