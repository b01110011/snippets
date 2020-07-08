'use strict'

const Env = use('Env')
const User = use('App/Models/User')

class UserController
{
    async login({ auth, request })
    {
        const { email, password } = request.all()
        return await auth.attempt(email, password)
    }

    async logout({ auth, response, request })
    {
        const refreshToken = request.input('refreshToken')
        if (!refreshToken) return response.badRequest('missing refresh token')

        await auth.revokeTokens([refreshToken], true)

        return response.ok()
    }

    user({ auth })
    {
        return auth.user
    }

    async registration({ request, response })
    {
        const registrationAllowed = Env.get('REGISTRATION_ALLOWED')
        if (registrationAllowed !== 'true') return response.forbidden()

        const data = request.only(['email', 'password'])
        return await User.create(data)
    }
}

module.exports = UserController