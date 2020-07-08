'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class Entity extends Model
{
    static get hidden()
    {
        return ['password']
    }

    getLocation(location)
    {
        return JSON.parse(location)
    }

    setLocation(location)
    {
        return JSON.stringify(location)
    }

    region()
    {
        return this.belongsTo('App/Models/Region')
    }

    metro()
    {
        return this.belongsTo('App/Models/Metro')
    }

    static get createdAtColumn()
    {
        return null
    }

    static get updatedAtColumn()
    {
        return null
    }

    static boot()
    {
        super.boot()

        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) =>
        {
            if (userInstance.dirty.password)
            {
                userInstance.password = await Hash.make(userInstance.password)
            }
        })
    }

    /**
     * A relationship on tokens is required for auth to
     * work. Since features like `refreshTokens` or
     * `rememberToken` will be saved inside the
     * tokens table.
     *
     * @method tokens
     *
     * @return {Object}
     */
    tokens()
    {
        return this.hasMany('App/Models/Token')
    }
}

module.exports = Entity