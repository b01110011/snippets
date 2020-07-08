'use strict'

const bx24 = require('../../../settings/bx24.js')
const phoneFormatRu = require('../../../settings/helper.js')
const lf = require('../../../settings/lead-fields.js')
const _ = require('lodash')

class Bitrix24Controller
{
    // опросник
    async questionnaire({ request, response })
    {
        const { phone, apartment, price, region, payment, deadline } = request.all()
    
        let leads = []
        let phones = phoneFormatRu(phone)
    
        for (let key in phones)
        {
            let data = await bx24.call('crm.lead.list',
            {
                filter:
                {
                    PHONE: phones[key]
                },
                select: ['ID', 'TITLE', 'DATE_CREATE'],
            })
    
            leads = leads.concat(data)
        }
    
        leads = _.sortBy(leads, ['DATE_CREATE']).reverse()
    
        if (leads.length) // обновляем лид
        {
            let fields =
            {
                STATUS_ID: 'NEW'
            }
    
            fields[lf.apartment] = apartment
            fields[lf.price] = price
            fields[lf.region] = region
            fields[lf.payment] = payment
            fields[lf.deadline] = deadline
    
            let isUpdated = await bx24.call('crm.lead.update',
            {
                id: leads[0].ID,
                fields
            })
    
            if (isUpdated) // успешно обновили лид
            {
                await bx24.call('crm.timeline.comment.add',
                {
                    fields:
                    {
                        ENTITY_ID: leads[0].ID,
                        ENTITY_TYPE: 'lead',
                        COMMENT: 'Был добавлен Опросник.'
                    }
                })
            }
        }
        else // добавляем лид
        {
            let fields =
            {
                TITLE: 'Опросник',
                PHONE:
                [
                    {
                        VALUE: phones[0],
                        VALUE_TYPE: 'WORK'
                    }
                ]
            }
    
            fields[lf.apartment] = apartment
            fields[lf.price] = price
            fields[lf.region] = region
            fields[lf.payment] = payment
            fields[lf.deadline] = deadline
    
            let leadId = await bx24.call('crm.lead.add', { fields })
            if (leadId)
            {
                await bx24.call('crm.timeline.comment.add',
                {
                    fields:
                    {
                        ENTITY_ID: leadId,
                        ENTITY_TYPE: 'lead',
                        COMMENT: 'Создание лида из Опросника.'
                    }
                })
            }
        }

        return response.ok()
    }

    // обратный звонок
    async callback({ request, response })
    {
        const { name, phone } = request.all()

        // проверяем на дубликаты лидов
        let leads = []
        let phones = phoneFormatRu(phone)

        for (let key in phones)
        {
            let data = await bx24.call('crm.lead.list',
            {
                filter:
                {
                    PHONE: phones[key]
                },
                select: ['ID', 'TITLE', 'DATE_CREATE'],
            })

            leads = leads.concat(data)
        }

        leads = _.sortBy(leads, ['DATE_CREATE']).reverse()

        if (leads.length) // обновляем лид
        {
            let isUpdated = await bx24.call('crm.lead.update',
            {
                id: leads[0].ID,
                fields:
                {
                    STATUS_ID: 'NEW',
                    NAME: name
                }
            })

            if (isUpdated) // успешно обновили лид
            {
                await bx24.call('crm.timeline.comment.add',
                {
                    fields:
                    {
                        ENTITY_ID: leads[0].ID,
                        ENTITY_TYPE: 'lead',
                        COMMENT: 'Запрос на обратный звонок.'
                    }
                })
            }
        }
        else // добавляем лид
        {
            let leadId = await bx24.call('crm.lead.add',
            {
                fields:
                {
                    TITLE: 'Обратный звонок',
                    NAME: name,
                    PHONE:
                    [
                        {
                            VALUE: phones[0],
                            VALUE_TYPE: 'WORK'
                        }
                    ]
                }
            })

            if (leadId)
            {
                await bx24.call('crm.timeline.comment.add',
                {
                    fields:
                    {
                        ENTITY_ID: leadId,
                        ENTITY_TYPE: 'lead',
                        COMMENT: 'Запрос на обратный звонок.'
                    }
                })
            }
        }

        return response.ok()
    }
}

module.exports = Bitrix24Controller