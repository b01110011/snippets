const axios = require('axios')

let webhook = 'https://*.bitrix24.ru/rest/1/*/'

let listMethods =
[
    'crm.lead.list',
]

module.exports = {
    async call(method, payload = {})
    {
        if (listMethods.includes(method))
        {
            let result, start = null, data = []
            do
            {
                payload['start'] = start
                result = await axios.post(webhook + method, payload)
                data = data.concat(result.data.result)
            }
            while (start = result.data.next)
            
            return data
        }
        else
        {
            let result = await axios.post(webhook + method, payload)
            return result.data.result
        }
    }
}