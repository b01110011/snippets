'use strict'

class FeedbackQuestionnaire
{
    get rules()
    {
        return {
            phone: 'required',
            apartment: 'required',
            price: 'required',
            region: 'required',
            payment: 'required',
            deadline: 'required',
        }
    }

    get messages()
    {
        return {
            'phone.required': 'Телефон не заполнен.',
            'apartment.required': 'Тип квартиры не выбран.',
            'price.required': 'Ценовой диапозон не выбран.',
            'region.required': 'Район не выбран.',
            'payment.required': 'Предпочитаемая оплата не выбрана.',
            'deadline.required': 'Срок сдачи не выбран.',
        }
    }
}

module.exports = FeedbackQuestionnaire