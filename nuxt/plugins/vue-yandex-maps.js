import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'       

Vue.use(YmapPlugin,
{
    apiKey: '30eedcae-a789-4950-b5d2-40515dd82261',
    lang: 'ru_RU',
    coordorder: 'latlong',
    version: '2.1'
})