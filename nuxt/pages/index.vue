<template>
    
</template>

<script>
import { required, requiredIf, decimal } from 'vuelidate/lib/validators'
import map from '@/mixins/map'
import action from '@/mixins/action'

import siteMenu from '@/components/siteMenu'

export default {
    layout: 'empty',
    mixins: [map, action],
    components:
    {
        siteMenu
    },
    validate({ params, query })
    {
        if (params.action == 'create') return true
        if (params.action == 'edit' && query.id) return true

        return false
    },
    data()
    {
        return {
        }
    },
    validations:
    {
        newbuilding:
        {
            name: { required },
            path: { required },
            photo: { required: requiredIf('isCreate') },
            region_id: { required },
            developer_id: { required },
            interior_id: { required },
            deadline: { required },
            price: { required, decimal },
            description: { required },
            gallery: { required },
            location_description: { required },
            location: { required },
        }
    },
    head()
    {
        return {
            title: 'Новостройки новосибирска'
        }
    },
    async asyncData({ error, params, store })
    {
        try
        {
            await store.dispatch('', params.id)
        }
        catch (e)
        {
            error({ statusCode: 404, message: '' })
        }
    },
    async fetch()
    {
        try
        {
            await this.$store.dispatch('', params.id)
        }
        catch (e)
        {
            
        }
    }
}
</script>

<style scoped>

</style>