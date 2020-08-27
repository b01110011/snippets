<template>
    <div>
        <input type="text" v-mask="'####-##'" v-model="myInputModel">
        <!-- OR -->
        <input type="text" v-mask="nameOfVariableWithMask" v-model="myInputModel">
    </div>
</template>

<script>
export default {
    data()
    {
        return {
            myInputModel: 123456,
            nameOfVariableWithMask: '####-##',
        }
    }
}
</script>

<style>

</style>