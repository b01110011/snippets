import { formdata } from '~/mixins/formdata'
import _ from 'lodash'

const rootUrl = '/newbuildings'

const byDefault =
{
    entity:
    {
        id: 0,
        name: '',
    },
}

export const state = () =>
({
    entities: [],
    entity: _.cloneDeep(byDefault.entity),
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
    clear(state, entity = 'entity')
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
        const entities = await this.$axios.$get(`${rootUrl}`)
        commit('entities', entities)
    },
    async entity({ commit }, { id, update = false })
    {
        const entity = await this.$axios.$get(`${rootUrl}/${id}`)
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

            const entity = await this.$axios.$post(`${rootUrl}`, data)
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

            const entity = await this.$axios.$put(`${rootUrl}/${state.entity.id}`, data)
            commit('update', entity)
            dispatch('snackbar', 'Новостройка успешно отредактирована!', { root: true })
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
    async delete({ state, commit, dispatch })
    {
        try
        {
            await this.$axios.$delete(`${rootUrl}/${state.entity.id}`)
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

            await this.$axios.$post(`${rootUrl}/sort`, sort)
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
}