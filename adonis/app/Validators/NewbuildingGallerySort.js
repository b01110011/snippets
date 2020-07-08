'use strict'

class NewbuildingGallerySort
{
    get rules()
    {
        return {
            'sort': 'required|array',
            'sort.*.id': 'required|number',
            'sort.*.sort': 'required|number',
        }
    }

    get messages()
    {
        return {
            'sort.required': 'Сортировка не заполнена.',
            'sort.array': 'Сортировка должна быть массивом.',

            'sort.*.id.required': 'Идентификатор новостройки обязателен.',
            'sort.*.id.number': 'Идентификатор новостройки должен быть числом.',

            'sort.*.sort.required': 'Сортировка галлереи не заполнена.',
            'sort.*.sort.number': 'Сортировка галлереи должна быть числом.',
        }
    }
}

module.exports = NewbuildingGallerySort