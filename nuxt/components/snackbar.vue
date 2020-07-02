<template>
    <v-snackbar v-model="snackbar">
        {{ $store.state.snackbarText }}

        <v-btn color="white" icon @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    computed:
    {
        snackbar:
        {
            get()
            {
                return this.$store.state.snackbar
            },
            set(value)
            {
                this.$store.commit('snackbar', value)
            }
        }
    }
}
</script>

<style scoped>

</style>