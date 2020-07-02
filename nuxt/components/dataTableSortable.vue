<template>
    <v-data-table
        :headers="typeHeaders"
        :items="apartmentLayouts"
        :items-per-page="5"
        locale="ru"
        class="elevation-1"
    >
        <template v-slot:body="{ items }">
            <draggable
                v-model="apartmentLayouts"
                handle=".apartment_layout_handle"
                tag="tbody"
                @change="apartmentLayoutsSort"
            >
                <tr
                    v-for="item in items"
                    :key="item.id"
                >
                    <td><v-icon class="apartment_layout_handle">mdi-drag</v-icon></td>
                    <td><v-img :src="item.image" width="50" height="50" /></td>
                    <td>{{ item.apartment_type_id }}</td>
                    <td>{{ item.apartment_room_id }}</td>
                    <td>{{ item.area }}</td>
                    <td>
                        <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="$store.dispatch('newbuilding/apartmentShowForm', item.id)"
                                    v-on="on"
                                >
                                    mdi-pencil
                                </v-icon>
                            </template>
                            <span>Редактировать</span>
                        </v-tooltip>

                        <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                <v-icon
                                    small
                                    @click="$store.commit('newbuilding/apartmentEdit', item.id); dialogDelete = true"
                                    v-on="on"
                                >
                                    mdi-delete
                                </v-icon>
                            </template>
                            <span>Удалить</span>
                        </v-tooltip>
                    </td>
                </tr>
            </draggable>
        </template>
    </v-data-table>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components:
    {
        draggable
    },
    data()
    {
        return {
            typeHeaders:
            [
                { text: '',                 value: 'draggable',         sortable: false, width: '56px' },
                { text: 'Изображение',      value: 'image',             sortable: false },
                { text: 'Тип квартиры',     value: 'apartment_type_id', sortable: false },
                { text: 'Кол-во комнат',    value: 'apartment_room_id', sortable: false },
                { text: 'Площадь',          value: 'area',              sortable: false },
                { text: '',                 value: 'actions',           sortable: false, width: '100px' },
            ],
        }
    },
    computed:
    {
        apartmentLayouts:
        {
            get()
            {
                return this.$store.state.newbuilding.newbuilding.apartment_layouts
            },
            set(apartment_layouts)
            {
                this.$store.commit('newbuilding/newbuilding', { apartment_layouts })
            }
        }
    },
    methods:
    {
        async apartmentLayoutsSort()
        {
            await this.$store.dispatch('newbuilding/apartmentSort')
        },
        async apartmentDelete()
        {
            await this.$store.dispatch('newbuilding/apartmentDelete')
        }
    }
}
</script>

<style scoped>
.apartment_layout_handle {
    cursor: move;
}
</style>