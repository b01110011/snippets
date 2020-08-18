import Vue from 'vue'

const rootUrl = '/settings'

export const state = () =>
({
    entities: {},
    init: false,
})

export const getters =
{
    phone(state)
    {
        return state.entities.phone?.replace(/[^\d+]/g, '')
    },
}

export const mutations =
{
    entities(state, entities)
    {
        entities.forEach(entity =>
        {
            state.init ? state.entities[entity.key] = entity.value : Vue.set(state.entities, entity.key, entity.value)
        })

        if (!state.init) state.init = true
    },
    update(state, entity)
    {
        state.entities[entity.key] = entity.value
    },
}

export const actions =
{
    async entities({ commit })
    {
        const entities = await this.$axios.$get(`${rootUrl}`)
        commit('entities', entities)
    },
    async update({ state, commit, dispatch }, { key, value })
    {
        try
        {
            const entity = await this.$axios.$put(`${rootUrl}/${key}`, { value })
            commit('update', entity)
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
}