<template>
    <div>
        <div class="title mb-2">entity</div>

        <client-only>
            <v-input
                :error-messages="entityErrors"
            >
                <vue-editor
                    v-model="entity"
                    @blur="validator.entity.$touch()"
                    class="w-100 white"
                />
            </v-input>
        </client-only>
    </div>
</template>

<script>
export default {
    props: ['validator'],
    computed:
    {
        entity:
        {
            get()
            {
                return this.$store.state.entity
            },
            set(entity)
            {
                this.$store.commit('newbuilding/newbuilding', { entity })
            }
        },
        entityErrors()
        {
            const errors = []
            if (!this.validator.entity.$dirty) return errors

            !this.validator.entity.required && errors.push('Незаполненное поле!')

            return errors
        }
    }
}
</script>

<style scoped>

</style>