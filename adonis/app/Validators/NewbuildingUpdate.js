'use strict'

class NewbuildingUpdate
{
    get rules()
    {
        const userId = this.ctx.params.id

        return {
            path: `required|string|unique:newbuildings,path,id,${userId}`,
            name: 'required|string|max:100',
            photo: 'file|file_size:2mb|file_types:image',
            photo_map: 'file|file_size:2mb|file_types:image',
            deadline: 'required|string',
            price: 'required|number',
            region_id: 'required|integer',
            developer_id: 'required|integer',
            metro_id: 'integer',
            interior_id: 'required|integer',
            description: 'required|string',
            location: 'required|array|min:2|max:2',
            'location.*': 'required|number',
            location_description: 'required|string',
        }
    }

    get messages()
    {
        return {
            'path.required': 'Путь страницы не заполнен.',
            'path.string': 'Путь страницы должен быть строкой.',
            'path.unique': 'Такой путь страницы уже есть в базе данных.',

            'name.required': 'Название ЖК не заполнено.',
            'name.string': 'Название ЖК не заполнено.',
            'name.max': 'Название ЖК не должно превышать 100 символов.',

            'photo.file': 'Главное фото должно быть файлом.',
            'photo.file_size': 'Размер главного фото не должен превышать 2МБ.',
            'photo.file_types': 'Главное фото должно быть картинкой.',

            'photo_map.file': 'Фото для карты должно быть файлом.',
            'photo_map.file_size': 'Размер фото для карты не должен превышать 2МБ.',
            'photo_map.file_types': 'Фото для карты должно быть картинкой.',

            'deadline.required': 'Срок сдачи не заполнен.',
            'deadline.string': 'Срок сдачи должен быть строкой.',

            'price.required': 'Цена не заполнена.',
            'price.number': 'Цена должна быть числом.',

            'region_id.required': 'Район не заполнен.',
            'region_id.integer': 'Район не выбран.',

            'developer_id.required': 'Застройщик не заполнен.',
            'developer_id.integer': 'Застройщик не выбран.',

            'metro_id.required': 'Метро не заполнено.',
            'metro_id.integer': 'Метро не выбрано.',

            'interior_id.required': 'Тип отделки не заполнен.',
            'interior_id.integer': 'Тип отделки не выбран.',

            'description.required': 'Описание ЖК не заполнено.',
            'description.string': 'Описание ЖК должно быть строкой.',

            'location.required': 'Расположение новостройки не выбрано.',
            'location.array': 'Расположение новостройки должно быть массивом.',
            'location.min': 'Размер массива расположения новостройки должно иметь длину 2.',
            'location.max': 'Размер массива расположения новостройки должно иметь длину 2.',
            'location.*.required': 'Не заполнены координаты расположения новостройки.',
            'location.*.number': 'Координаты расположения новостройки должны быть числом.',

            'location_description.required': 'Описание расположения не заполнено.',
            'location_description.string': 'Описание расположения должно быть строкой.',
        }
    }
}

module.exports = NewbuildingUpdate