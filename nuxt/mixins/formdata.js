import { fromObj } from 'form-data-to-object'

export default {
    methods:
    {
        formdata
    }
}

export function formdata(entity)
{
    const formData = new FormData()
    let formDataObj = fromObj(entity)
    Object.keys(formDataObj).forEach(key => formData.append(key, formDataObj[key]))

    return formData
}