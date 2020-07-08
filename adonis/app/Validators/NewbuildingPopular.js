'use strict'

class NewbuildingPopular
{
    get rules()
    {
        return {
            popular: 'required|boolean',
        }
    }

    get messages()
    {
        return {
            'popular.required': 'Не выбрано действие для внесения или удаления из популярных новостроек.',
            'popular.boolean': 'Не выбрано действие для внесения или удаления из популярных новостроек.',
        }
    }
}

module.exports = NewbuildingPopular