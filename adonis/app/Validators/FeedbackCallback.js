'use strict'

class FeedbackCallback
{
    get rules()
    {
        return {
            name: 'required',
            phone: 'required',
        }
    }

    get messages()
    {
        return {
            'name.required': 'Имя не заполнено.',
            'phone.required': 'Телефон не заполнен.',
        }
    }
}

module.exports = FeedbackCallback