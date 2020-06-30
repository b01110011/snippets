<template>
    <client-only>
        <v-input
            :error-messages="markerErrors"
        >
            <yandex-map
                class="map w-100"
                :coords="coords"
                :zoom="zoom"
                :controls="controls"
                @click="markerMove"
            >
                <ymap-marker
                    v-if="marker"
                    :marker-id="marker.id" 
                    :coords="marker.coords"
                    :icon="marker.icon"
                />
            </yandex-map>
        </v-input>
    </client-only>
</template>

<script>
import map from '@/mixins/map'

export default {
    mixins: [map],
    data()
    {
        return {
            marker: null,
            coords: [55.030199, 82.920430],
            controls: ['rulerControl', 'zoomControl'],
            zoom: 10,
        }
    },
    computed:
    {
        location:
        {
            get()
            {
                return this.$store.state.newbuilding.newbuilding.location
            },
            set(location)
            {
                this.$store.commit('newbuilding/newbuilding', { location })
            }
        },
        photoMap()
        {
            return this.$store.state.newbuilding.newbuilding.photo_map
        },
        markerErrors()
        {
            const errors = []
            if (!this.validator.newbuilding.location.$dirty) return errors

            !this.validator.newbuilding.location.required && errors.push('Выберите расположение новостройки!')

            return errors
        },
    },
    mounted()
    {
        if (this.photoMap && this.location)
        {
            this.marker = {
                id: 0,
                coords: this.location,
                icon:
                {
                    ...this.markerIcon(),
                    imageHref: this.photoMap || '/img/map-empty.png'
                }
            }
        }
    },
    methods:
    {
        markerMove(e)
        {
            if (this.marker)
            {
                this.marker.coords = e.get('coords')
                this.location = this.marker.coords
            }
            else
            {
                this.marker = {
                    id: 0,
                    coords: e.get('coords'),
                    icon:
                    {
                        ...this.markerIcon(),
                        imageHref: this.photoMap || '/img/map-empty.png'
                    }
                }
                this.location = this.marker.coords
            }
        },
    },
    watch:
    {
        photoMap()
        {
            if (!this.marker) return

            this.marker.icon = {
                ...this.markerIcon(),
                imageHref: this.photoMap || '/img/map-empty.png'
            }
        }
    }
}
</script>

<style scoped>
.map {
    height: 400px;
}
</style>