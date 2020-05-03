import { fromObj } from 'form-data-to-object'

export default {
    methods:
    {
        formdata(entity)
        {
            const formData = new FormData()
            formDataObj = fromObj(entity)
            Object.keys(formDataObj).forEach(key => formData.append(key, formDataObj[key]))

            return formData
        }
    }
}