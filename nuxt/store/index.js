export const state = () =>
({
    menu:
    [
        { name: 'Главная',              alias: 'home',          admin: false,   link: '/',              click: null,                    icon: 'mdi-home-outline',           },
        { name: 'Заказать звонок',      alias: 'callback',      admin: false,   link: null,             click: 'callbackDialog',        icon: 'mdi-phone-incoming-outline', },
        { name: 'Админка',              alias: 'admin',         admin: true,    link: '/admin',         click: null,                    icon: 'mdi-cog',                    },
    ],
    phone: '+7 (383) 000-00-00',
    snackbar: false,
    snackbarText: ''
})

export const getters =
{
    phone(state)
    {
        return state.phone.replace(/[^\d+]/g, '')
    },
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
            } = await this.$axios.$get('/init')

            commit('region/regions', regions)
            commit('metro/metros', metros)
        }
        catch (e)
        {
            dispatch('snackbar', 'Ошибка получения стартовых данных.')
        }
    },
    snackbar({ commit }, message)
    {
        commit('snackbarText', message)
        commit('snackbar', true)
    }
}