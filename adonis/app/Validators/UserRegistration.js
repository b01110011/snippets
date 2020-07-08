'use strict'

class UserRegistration
{
    get rules()
    {
        return {
            email: 'required|email|unique:users',
            password: 'required'
        }
    }

    get messages()
    {
        return {
            'email.required': 'E-mail не заполнен.',
            'email.email': 'E-mail имеет неправильный формат.',
            'email.unique': 'Такой E-mail уже зарегистрирован.',

            'password.required': 'Пароль не заполнен.',
        }
    }
}

module.exports = UserRegistration