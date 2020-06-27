import { formdata } from '~/mixins/formdata'

const entityDefault =
{
    id: 0,
    name: '',
    created_at: null,
    updated_at: null
}

export const state = () =>
({
    entities: [],
    entity: { ...entityDefault },
    entityID: 0
})

export const mutations =
{
    entities(state, entities)
    {
        state.entities = entities
    },
    entity(state, entity)
    {
        for (let key in entity)
        {
            state.entity[key] = entity[key]
        }
    },
    entityID(state, id)
    {
        state.entityID = id
    },
    entityCreate(state, entity)
    {
        state.entities.push(entity)
    },
    entityUpdate(state, entity)
    {
        let index = state.entities.findIndex(item => item.id == entity.id)
        state.entities.splice(index, 1, entity)
    },
    entityDelete(state)
    {
        state.entities = state.entities.filter(item => item.id != state.entityID)
    },
    entityClear(state)
    {
        state.entity = { ...entityDefault }
    }
}

export const actions =
{
    async entities({ commit })
    {
        const entities = await this.$axios.$get('/entities')
        commit('entities', entities)
    },
    async entity({ commit }, id)
    {
        const entity = await this.$axios.$get(`/entities/${id}`)
        commit('entity', entity)
    },
    async entityCreate({ state, commit, dispatch })
    {
        try
        {
            const entityData = {
                ...state.entity
            }

            const entity = await this.$axios.$post('/entities', formdata(entityData))
            commit('entityCreate', entity)
            dispatch('snackbar', 'Сущность успешно добавлена!', { root: true })
            this.$router.push('/admin/entities/')
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
    async entityUpdate({ state, commit, dispatch })
    {
        try
        {
            const entityData = {
                ...state.entity
            }

            const entity = await this.$axios.$put(`/entities/${state.entity.id}`, formdata(entityData))
            commit('entityUpdate', entity)
            dispatch('snackbar', 'Сущность успешно отредактирована!', { root: true })
            this.$router.push('/admin/entities/')
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
    async entityDelete({ state, commit })
    {
        try
        {
            await this.$axios.$delete(`/entities/${state.entityID}`)
            commit('entityDelete')
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    }
}