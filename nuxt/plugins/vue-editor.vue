<template>
    <client-only>
        <v-input
            :error-messages="descriptionErrors"
        >
            <vue-editor
                v-model="description"
                @blur="validator.description.$touch()"
                class="w-100 white"
            />
        </v-input>
    </client-only>
</template>

<script>
export default {

}
</script>

<style>

</style>