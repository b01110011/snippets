import _ from 'lodash'

const rootUrl = '/newbuildings'

const byDefault =
{
    entity:
    {
        id: 0,
        text: '',
    },
}

export const state = () =>
({
    entity: _.cloneDeep(byDefault.entity),
})

export const mutations =
{
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
    async create({ state, commit, dispatch, rootState })
    {
        try
        {
            let newbuildingID = rootState.newbuilding.entity.id
            let newbuilding = rootState.newbuilding.entities.find(item => item.id == newbuildingID)

            const data =
            {
                ...state.entity
            }

            const response = await this.$axios.$post(`${rootUrl}/${newbuildingID}/descriptions`, data)

            let descriptions = newbuilding.descriptions.concat(response)
            commit('newbuilding/update', { ...newbuilding, descriptions }, { root: true })
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
    async update({ state, commit, dispatch, rootState })
    {
        try
        {
            let newbuildingID = rootState.newbuilding.entity.id
            let descriptionID = state.entity.id
            let newbuilding = rootState.newbuilding.entities.find(item => item.id == newbuildingID)

            const data =
            {
                ...state.entity
            }

            const response = await this.$axios.$put(`${rootUrl}/${newbuildingID}/descriptions/${descriptionID}`, data)

            let descriptions = newbuilding.descriptions.map(item => item.id == descriptionID ? response : item)
            commit('newbuilding/update', { ...newbuilding, descriptions }, { root: true })
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
    async delete({ state, commit, dispatch, rootState })
    {
        try
        {
            let newbuildingID = rootState.newbuilding.entity.id
            let descriptionID = state.entity.id
            let newbuilding = rootState.newbuilding.entities.find(item => item.id == newbuildingID)

            await this.$axios.$delete(`${rootUrl}/${newbuildingID}/descriptions/${descriptionID}`)

            let descriptions = newbuilding.descriptions.filter(item => item.id != descriptionID)
            commit('newbuilding/update', { ...newbuilding, descriptions }, { root: true })
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
    async sort({ state, dispatch, rootState })
    {
        try
        {
            let newbuildingID = rootState.newbuilding.entity.id
            let index = rootState.newbuilding.entities.findIndex(item => item.id == newbuildingID)

            let sort = rootState.newbuilding.entities[index].descriptions.map((item, index) =>
            ({
                id: item.id,
                sort: index,
            }))

            sort = { sort }

            await this.$axios.$post(`${rootUrl}/${newbuildingID}/descriptions/sort`, sort)
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
}