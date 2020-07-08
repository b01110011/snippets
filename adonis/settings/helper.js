module.exports = function(phone)
{
    phone = phone.replace(/[^\d+]/g, '')
    let result = phone.match(/^(?:\+7|7|8)(\d{10})$/)
    if (result)
    {
        return ['+7' + result[1], '8' + result[1], '7' + result[1]]
    }
    else
    {
        return [phone]
    }
}