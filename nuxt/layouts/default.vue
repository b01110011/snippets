<template>
    <v-app>
        <v-navigation-drawer
            app
            color="blue-grey darken-3"
            v-model="drawer"
            temporary
        >
        </v-navigation-drawer>

        <v-app-bar
            app
            color="white"
            :inverted-scroll="invertedScroll"
            dense
        >
        </v-app-bar>

        <v-content>
            <nuxt />
        </v-content>
        
        <v-footer app absolute padless>
            <site-footer />
        </v-footer>
    </v-app>
</template>

<script>
import siteFooter from '@/components/siteFooter'

export default {
    components:
    {
        siteFooter,
        siteMenu
    },
    data()
    {
        return {
            drawer: null,
            invertedScroll: false
        }
    }
}
</script>

<style scoped>

</style>