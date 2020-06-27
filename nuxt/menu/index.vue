<template>
    <div class="menu d-flex flex-column">
        <div
            v-for="item in $store.getters.menu"
            :key="item.name"
        >

            <n-link
                v-if="item.link"
                :to="item.link"
            >
                <v-icon left>{{ item.icon }}</v-icon>
                {{ item.name }}
            </n-link>
            <a
                v-else
                @click.prevent="$store.commit(item.click, true)"
            >
                <v-icon left>{{ item.icon }}</v-icon>
                {{ item.name }}
            </a>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>