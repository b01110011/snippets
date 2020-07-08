'use strict'

class Entity
{
    get rules()
    {
        return {
            name: 'required|string|max:100',
            photo: 'required|file|file_size:2mb|file_types:image',
            region_id: 'required|integer',
            metro_id: 'integer',
        }
    }

    get messages()
    {
        return {
            'name.required': 'Название ЖК не заполнено.',
            'name.string': 'Название ЖК не заполнено.',
            'name.max': 'Название ЖК не должно превышать 100 символов.',

            'photo.required': 'Главное фото обязательно.',
            'photo.file': 'Главное фото должно быть файлом.',
            'photo.file_size': 'Размер главного фото не должен превышать 2МБ.',
            'photo.file_types': 'Главное фото должно быть картинкой.',

            'region_id.required': 'Район не заполнен.',
            'region_id.integer': 'Район не выбран.',

            'metro_id.required': 'Метро не заполнено.',
            'metro_id.integer': 'Метро не выбрано.',
        }
    }
}

module.exports = Entity