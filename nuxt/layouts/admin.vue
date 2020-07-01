<template>
    <v-app>
        <v-navigation-drawer
            app
            color="blue-grey darken-3"
            mobile-break-point="960"
            v-model="drawer"
        >
            <v-list dark dense nav subheader>
                <v-subheader dark class="title">Меню</v-subheader>

                <v-list-item
                    v-for="link in menu"
                    :key="link.to"
                    link
                    nuxt
                    :to="link.to"
                >
                    <v-list-item-icon class="mr-4">
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ link.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            dense
            color="white"
            class="mx-0"
        >
            <v-app-bar-nav-icon class="d-md-none" @click="drawer = true" />

            <v-spacer />

            <v-toolbar-items>
                <v-divider vertical />

                <v-btn
                    class="text-none"
                    to="/"
                    text
                    nuxt
                    exact
                >
                    <v-icon left>mdi-home-outline</v-icon>
                    Главная
                </v-btn>

                <v-divider vertical />

                <v-btn
                    class="text-none"
                    to="/admin/"
                    text
                    nuxt
                    exact
                >
                    <v-icon left>mdi-cog</v-icon>
                    Админка
                </v-btn>

                <v-divider vertical />

                <v-btn
                    class="text-none"
                    text
                    @click="logout"
                >
                    <v-icon left>mdi-logout</v-icon>
                    Выход
                </v-btn>

                <v-divider vertical />
            </v-toolbar-items>
        </v-app-bar>

        <v-content>
            <nuxt />
        </v-content>

        <snackbar />
    </v-app>
</template>

<script>
import snackbar from '@/components/snackbar'

export default {
    middleware: ['auth'],
    components:
    {
        snackbar
    },
    data()
    {
        return {
            drawer: null,
            menu:
            [
                { to: '/admin/newbuildings/', name: 'Новостройки', icon: 'mdi-office-building' },
                { to: '/admin/developers/', name: 'Застройщики', icon: 'mdi-card-account-details-outline' },
                { to: '/admin/apartments/', name: 'Планировки', icon: 'mdi-view-compact-outline' },
            ]
        }
    },
    methods:
    {
        async logout()
        {
            await this.$auth.logout()
        }
    }
}
</script>

<style scoped>

</style>