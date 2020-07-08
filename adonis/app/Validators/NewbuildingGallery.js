'use strict'

class NewbuildingGallery
{
    get rules()
    {
        return {
            'sort': 'required|integer',
            'image': 'required|file|file_size:2mb|file_types:image',
        }
    }

    get messages()
    {
        return {
            'sort.required': 'Сортировка не заполнена.',
            'sort.integer': 'Значения сортировки должны быть целочисленными.',

            'image.required': 'Фото для галереи обязательно.',
            'image.file': 'Фото для галереи должно быть файлом.',
            'image.file_size': 'Размер фото для галереи не должен превышать 2МБ.',
            'image.file_types': 'Фото для галереи должно быть картинкой.',
        }
    }
}

module.exports = NewbuildingGallery