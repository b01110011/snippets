<template>
    <layout-default>
        <div class="home">
            <img alt="Vue logo" src="../assets/logo.png">
            <HelloWorld msg="Welcome to Your Vue.js App"/>
        </div>
    </layout-default>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import layoutDefault from '@/views/layouts/Default'

export default {
    name: 'Home',
    components: { HelloWorld, layoutDefault }
}
</script>
