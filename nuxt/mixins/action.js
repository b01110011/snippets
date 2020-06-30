export default {
    computed:
    {
        isCreate()
        {
            return this.$route.params.action == 'create'
        },
        isEdit()
        {
            return this.$route.params.action == 'edit'
        }
    }
}