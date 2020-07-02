<template>
    <v-dialog
        v-model="cDialog"
        max-width="560"
    >
        <v-card>
            <v-card-title class="primary white--text">Запрос на удаление</v-card-title>

            <v-card-text class="pt-5">Вы точно хотите это удалить?</v-card-text>

            <v-divider />

            <v-card-actions>
                <v-spacer />

                <v-btn
                    color="primary"
                    @click="$emit('delete'); cDialog = false"
                >
                    Удалить
                </v-btn>

                <v-btn
                    @click="cDialog = false"
                >
                    Отменить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['dialog'],
    computed:
    {
        cDialog:
        {
            get()
            {
                return this.dialog
            },
            set(value)
            {
                this.$emit('update:dialog', value)
            }
        }
    }
}
</script>

<style scoped>

</style>