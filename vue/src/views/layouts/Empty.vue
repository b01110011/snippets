<template>
    <div>
        <site-menu />

        <slot></slot>
    </div>
</template>

<script>
import siteMenu from '@/components/Menu'

export default {
    components: { siteMenu, }
}
</script>

<style lang="scss">

</style>