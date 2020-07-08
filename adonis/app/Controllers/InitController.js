'use strict'

const Entity = use('App/Models/Entity')
const Region = use('App/Models/Region')
const Metro = use('App/Models/Metro')

class InitController
{
    async index()
    {
        // все новостройки
        const entities = await Entity.query()
                                    .with('region')
                                    .with('metro')
                                    .fetch()

        // районы
        const regions = await Region.all()

        // метро
        const metros = await Metro.all()

        return { entities, regions, metros }
    }
}

module.exports = InitController