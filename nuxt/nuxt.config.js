require('dotenv').config()

import vuetify from './settings/vuetify'
import serverMiddleware from './settings/serverMiddleware'
import auth from './settings/auth'

export default {
    mode: 'universal',
    head:
    {
        titleTemplate: '%s - ' + process.env.npm_package_display_name,
        title: process.env.npm_package_display_name || '',
        meta:
        [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link:
        [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    loading: { color: '#8b00ff' },
    css:
    [
        '~/static/fonts/opensans/opensans.css',
        '~/static/fonts/gotham/gothampro.css',
        '~/static/css/style.css',
    ],
    plugins:
    [
        { src: '~/plugins/vue-yandex-maps.js',      mode: 'client' },
        { src: '~/plugins/vue-easy-lightbox.js',    mode: 'client' },
        { src: '~/plugins/vue-editor.js',           mode: 'client' },
        '~/plugins/vue-phone-number-input.js',
        '~/plugins/vue-lodash.js',
        '~/plugins/vue-scrollto.js',
        '~/plugins/vuelidate.js',
    ],
    buildModules:
    [
        '@nuxtjs/vuetify',
    ],
    modules:
    [
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        'vue-scrollto/nuxt',
        [
            '@nuxtjs/yandex-metrika',
            {
                id: '65028472',
                webvisor: true,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
            }
        ]
    ],
    axios:
    {
        credentials: true,
        baseURL: process.env.SERVER_URL
    },
    serverMiddleware,
    vuetify,
    auth,
    build:
    {
        // vendor:
        // [
        //   'vue-yandex-maps',
        //   'vue-phone-number-input',
        //   'vue-lodash',
        //   'vue-easy-lightbox',
        //   'vue-scrollto',
        //   'tiptap-vuetify'
        // ],

        /*
        ** You can extend webpack config here
        */
        extend(config, ctx){}
    }
}