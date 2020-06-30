<template>
    <client-only>
        <vue-easy-lightbox
            move-disabled
            :visible="lightbox.show"
            :imgs="lightbox.img"
            :index="lightbox.index"
            @hide="lightboxHide"
        />
    </client-only>
</template>

<script>
export default {
    data()
    {
        return {
            lightbox:
            {
                show: false,
                index: 0,
                img: ''
            }
        }
    },
    methods:
    {
        lightboxShow(img)
        {
            this.lightbox.img = img
            this.lightbox.show = true
        },
        lightboxHide()
        {
            this.lightbox.show = false
        }
    }
}
</script>

<style>

</style>