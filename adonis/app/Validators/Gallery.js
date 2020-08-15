'use strict'

class Gallery
{
    get rules()
    {
        return {
            'gallery': 'required|array',
            'gallery.*': 'required|object',
            'gallery.*.image': 'required|file|file_size:512kb|file_types:image|file_ext:png,jpg',
        }
    }

    get messages()
    {
        return {
            'gallery.required': 'Галерея не выбрана.',
            'gallery.array': 'Галерея должна быть массивом.',

            'gallery.*.required': 'Галерея не выбрана.',
            'gallery.*.object': 'Значения массива галлереи должны быть объектами.',

            'gallery.*.image.required': 'Фото для галереи обязательно.',
            'gallery.*.image.file': 'Фото для галереи должно быть файлом.',
            'gallery.*.image.file_size': 'Размер фото для галереи не должен превышать 512КБ.',
            'gallery.*.image.file_types': 'Фото для галереи должно быть картинкой.',
            'gallery.*.image.file_ext': 'Допустимые расширения фото для галереи: png, jpg.',
        }
    }
}

module.exports = Gallery