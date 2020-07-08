'use strict'

class NewbuildingCreate
{
    get rules()
    {
        return {
            path: 'required|string|unique:newbuildings',
            name: 'required|string|max:100',
            photo: 'required|file|file_size:2mb|file_types:image',
            photo_map: 'required|file|file_size:2mb|file_types:image',
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
            gallery: 'required|array',
            'gallery.*': 'required|object',
            'gallery.*.sort': 'required|integer',
            'gallery.*.image': 'required|file|file_size:2mb|file_types:image',
            'apartment_layouts': 'array',
            'apartment_layouts.*': 'required|object',
            'apartment_layouts.*.apartment_type_id': 'required|integer',
            'apartment_layouts.*.apartment_room_id': 'required|integer',
            'apartment_layouts.*.area': 'required|number',
            'apartment_layouts.*.sort': 'required|integer',
            'apartment_layouts.*.image': 'required|file|file_size:2mb|file_types:image',
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

            'photo.required': 'Главное фото обязательно.',
            'photo.file': 'Главное фото должно быть файлом.',
            'photo.file_size': 'Размер главного фото не должен превышать 2МБ.',
            'photo.file_types': 'Главное фото должно быть картинкой.',

            'photo_map.required': 'Фото для карты обязательно.',
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
            
            'gallery.required': 'Галерея не выбрана.',
            'gallery.array': 'Галерея должна быть массивом.',
            'gallery.*.required': 'Галерея не выбрана.',
            'gallery.*.object': 'Значения массива галлереи должны быть объектами.',
            'gallery.*.sort.required': 'У галереи не заполнена сортировка.',
            'gallery.*.sort.integer': 'Значения сортировки у галереи должны быть целочисленными.',
            'gallery.*.image.required': 'Фото для галереи обязательно.',
            'gallery.*.image.file': 'Фото для галереи должно быть файлом.',
            'gallery.*.image.file_size': 'Размер фото для галереи не должен превышать 2МБ.',
            'gallery.*.image.file_types': 'Фото для галереи должно быть картинкой.',

            'apartment_layouts.array': 'Планировки должны быть массивом.',
            'apartment_layouts.*.required': 'Не выбраны значения планировок.',
            'apartment_layouts.*.object': 'Значения планировок должны быть объектами.',
            'apartment_layouts.*.apartment_type_id.required': 'Тип планировки обязателен.',
            'apartment_layouts.*.apartment_type_id.integer': 'Тип планировки должен быть числом.',
            'apartment_layouts.*.apartment_room_id.required': 'Кол-во комнат обязателено.',
            'apartment_layouts.*.apartment_room_id.integer': 'Кол-во комнат должено быть числом.',
            'apartment_layouts.*.area.required': 'Площадь планировки обязателена.',
            'apartment_layouts.*.area.number': 'Площадь планировки должена быть числом.',
            'apartment_layouts.*.sort.required': 'Сортировка планировки обязательна.',
            'apartment_layouts.*.sort.integer': 'Сортировка планировки должена быть числом.',
            'apartment_layouts.*.image.required': 'Фото планировки обязательно.',
            'apartment_layouts.*.image.file': 'Фото планировки должно быть файлом.',
            'apartment_layouts.*.image.file_size': 'Размер фото планировки не должен превышать 2МБ.',
            'apartment_layouts.*.image.file_types': 'Фото планировки должно быть картинкой.',
        }
    }
}

module.exports = NewbuildingCreate