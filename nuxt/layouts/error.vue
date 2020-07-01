<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col>

                <template v-if="error.statusCode === 404">
                    <v-img src="/img/404.png" />
                    <div class="headline text-center" v-if="error.message">{{ error.message }}</div>
                    <div class="headline text-center" v-else>Страница не найдена.</div>
                </template>
                <template v-else>
                    <v-img src="/img/500.png" />
                    <div class="headline text-center">Ошибка сервера.</div>
                </template>

                <div class="text-center">
                    <n-link to="/">Главная страница</n-link>
                </div>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    layout: 'errors',
    props:
    {
        error:
        {
            type: Object,
            default: null
        }
    },
    head()
    {
        const title = this.error.statusCode === 404 ? 'Страница не найдена' : 'Ошибка сервера'
        return {
            title
        }
    }
}
</script>

<style scoped>

</style>