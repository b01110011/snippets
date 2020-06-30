<template>
    <vue-phone-number-input
        v-model="phoneModel"
        @update="phoneUpdate"
        default-country-code="RU"
        :translations="translations"
    />
</template>

<script>
import translations from '@/settings/vue-phone-number-input'

export default {
    data()
    {
        return {
            phoneModel: '',
            phoneValid: false,
        }
    },
    methods:
    {
        phoneUpdate(payload)
        {
            this.phone = payload.formattedNumber
            this.phoneValid = payload.isValid
        }
    }
}
</script>

<style>

</style>