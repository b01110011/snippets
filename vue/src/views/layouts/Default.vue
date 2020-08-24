<template>
    <div>
        <site-menu />

        <div>
            <h2>Logo</h2>
        </div>

        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import siteMenu from '@/components/Menu'

export default {
    components: { siteMenu, }
}
</script>

<style lang="scss">
.container {
    border: 1px solid #000;
    padding: 12px;
    width: 900px;
    margin: 0 auto;
}
</style>