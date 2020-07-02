<template>
    <div>
        <div class="title mb-2">Название ЖК</div>

        <v-text-field
            v-model="name"
            outlined
            dense
            background-color="white"
            placeholder="Название ЖК"
            :error-messages="nameErrors"
            @blur="validator.newbuilding.name.$touch()"
            :prepend-icon="translite ? 'mdi-link-lock' : 'mdi-link'"
            @click:prepend="translite = !translite"
        />

        <v-text-field
            v-model="path"
            outlined
            dense
            background-color="white"
            placeholder="Путь страницы"
            :error-messages="pathErrors"
            @blur="validator.newbuilding.path.$touch()"
            :readonly="translite"
            :prepend-icon="translite ? 'mdi-link-lock' : 'mdi-link'"
            @click:prepend="translite = !translite"
        />
    </div>
</template>

<script>
import slugify from 'slugify'

export default {
    props: ['validator'],
    data()
    {
        return {
            translite: true
        }
    },
    computed:
    {
        name:
        {
            get()
            {
                return this.$store.state.newbuilding.newbuilding.name
            },
            set(name)
            {
                this.$store.commit('newbuilding/newbuilding', { name })
            }
        },
        path:
        {
            get()
            {
                return this.$store.state.newbuilding.newbuilding.path
            },
            set(path)
            {
                this.$store.commit('newbuilding/newbuilding', { path })
            }
        },
        nameErrors()
        {
            const errors = []
            if (!this.validator.newbuilding.name.$dirty) return errors

            !this.validator.newbuilding.name.required && errors.push('Незаполненное поле!')

            return errors
        },
        pathErrors()
        {
            const errors = []
            if (!this.validator.newbuilding.path.$dirty) return errors

            !this.validator.newbuilding.path.required && errors.push('Незаполненное поле!')

            return errors
        },
    },
    watch:
    {
        name()
        {
            if (!this.translite) return

            this.path = slugify(this.name.toLowerCase())
        },
        translite()
        {
            if (!this.translite) return

            this.path = slugify(this.name.toLowerCase())
        }
    }
}
</script>

<style scoped>

</style>