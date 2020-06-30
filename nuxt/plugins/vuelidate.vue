<template>

</template>

<script>
import { required, requiredIf, decimal } from 'vuelidate/lib/validators'
import action from '@/mixins/action'

export default {
    mixins: [action],
    data()
    {
        return {
            loading: false
        }
    },
    computed:
    {
        newbuilding:
        {
            get()
            {
                return this.$store.state.newbuilding.newbuilding
            },
            set(value)
            {
                this.$store.commit('newbuilding/newbuilding', value)
            }
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
    methods:
    {
        async submit()
        {
            this.$v.$touch()
            if (this.$v.$invalid) return

            this.loading = true

            await this.$store.dispatch(this.isCreate ? 'newbuilding/newbuildingCreate' : 'newbuilding/newbuildingUpdate')

            this.loading = false
        }
    }
}
</script>

<style>

</style>