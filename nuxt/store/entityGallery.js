import { formdata } from '~/mixins/formdata'
import _ from 'lodash'

const rootUrl = '/newbuildings'
const secondUrl = 'gallery'

const byDefault =
{
    entity:
    {
        id: 0,
        gallery: [],
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

            const response = await this.$axios.$post(`${rootUrl}/${newbuildingID}/${secondUrl}`, formdata(data))

            let gallery = newbuilding.gallery.concat(response)
            commit('newbuilding/update', { ...newbuilding, gallery }, { root: true })
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
            let galleryID = state.entity.id
            let newbuilding = rootState.newbuilding.entities.find(item => item.id == newbuildingID)

            await this.$axios.$delete(`${rootUrl}/${newbuildingID}/${secondUrl}/${galleryID}`)

            let gallery = newbuilding.gallery.filter(item => item.id != galleryID)
            commit('newbuilding/update', { ...newbuilding, gallery }, { root: true })
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

            let sort = rootState.newbuilding.entities[index].gallery.map((item, index) =>
            ({
                id: item.id,
                sort: index,
            }))

            sort = { sort }

            await this.$axios.$post(`${rootUrl}/${newbuildingID}/${secondUrl}/sort`, sort)
        }
        catch (error)
        {
            dispatch('snackbar', error.response.data[0].message, { root: true })
        }
    },
}