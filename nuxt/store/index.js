export const state = () =>
({
    menu:
    [
        { name: 'Главная',              alias: 'home',          admin: false,   link: '/',              click: null,                    icon: 'mdi-home-outline',           },
        { name: 'Заказать звонок',      alias: 'callback',      admin: false,   link: null,             click: 'callbackDialog',        icon: 'mdi-phone-incoming-outline', },
        { name: 'Админка',              alias: 'admin',         admin: true,    link: '/admin',         click: null,                    icon: 'mdi-cog',                    },
    ],
    snackbar: false,
    snackbarText: ''
})

export const getters =
{
    menu(state)
    {
        return state.auth.loggedIn ? state.menu : state.menu.filter(item => !item.admin)
    }
}

export const mutations =
{
    snackbar(state, payload)
    {
        state.snackbar = payload
    },
    snackbarText(state, payload)
    {
        state.snackbarText = payload
    }
}

export const actions =
{
    async nuxtServerInit({ commit, dispatch })
    {
        try
        {
            let {
                regions,
                metros,
                settings,
                employees,
            } = await this.$axios.$get('/init')

            commit('region/entities', regions)
            commit('metro/entities', metros)
            commit('setting/entities', settings)
            commit('employee/entities', employees)
        }
        catch (e)
        {
            dispatch('snackbar', 'Ошибка получения стартовых данных.')
        }
    },
    async adminInit({ commit })
    {
        let {
            employees
        } = await this.$axios.$get('/init?admin=true')

        commit('employee/entities', employees)
    },
    snackbar({ commit }, message)
    {
        commit('snackbarText', message)
        commit('snackbar', true)
    }
}