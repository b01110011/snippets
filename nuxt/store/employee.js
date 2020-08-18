export const state = () =>
({
    entities: [],
})

export const mutations =
{
    entities(state, entities)
    {
        if (!entities) return

        entities = entities.map(entity =>
        {
            let id = parseInt(entity.ID)
            let name = entity.NAME ? entity.LAST_NAME + ' ' + entity.NAME : entity.EMAIL

            return { id, name }
        })

        state.entities = entities
    },
}