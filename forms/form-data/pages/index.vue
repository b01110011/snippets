<template>
    
</template>

<script>
import formdata from '@/mixins/formdata'

export default {
    mixins: [formdata],
    data()
    {
        return {
            loading: false,
            newbuilding:
            {
                id: 0,
                path: '',
                name: '',
                photo: '',
                photo_map: '',
                region_id: null,
                deadline: '',
                description: '',
                gallery: [],
                location: [],
                location_description: '',
                apartment_layouts: [],
                created_at: null,
                updated_at: null,
            },
            photoFile: null,
            photoMapFile: null,
        }
    },
    methods:
    {
        async submitCreate()
        {
            this.loading = true

            let gallery = this.newbuilding.gallery.map((galobj, index) =>
            ({
                sort: index,
                image: galobj.file
            }))

            const newbuilding =
            {
                ...this.newbuilding,
                photo: this.photoFile,
                photo_map: this.photoMapFile,
                gallery,
            }

            if (this.newbuilding.apartment_layouts.length)
            {
                newbuilding.apartment_layouts = this.newbuilding.apartment_layouts.map((alobj, index) =>
                ({
                    sort: index,
                    image: alobj.file,
                    type: alobj.type,
                    area: alobj.area,
                }))
            }
            else
            {
                delete newbuilding.apartment_layouts
            }

            try
            {
                this.newbuilding = await this.$axios.$post('/newbuilding', this.formdata(newbuilding))
            }
            catch (error)
            {
                console.error(error)
            }

            this.loading = false
        }
    }
}
</script>

<style scoped>

</style>