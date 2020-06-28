export default {
    strategies:
    {
        local:
        {
            endpoints:
            {
                login:
                {
                    url: '/auth/login',
                    method: 'post',
                    propertyName: 'token'
                },
                logout:
                {
                    url: '/auth/logout',
                    method: 'get'
                },
                user:
                {
                    url: '/auth/user',
                    method: 'get',
                    propertyName: false
                }
            },
            tokenRequired: true,
            tokenType: 'bearer'
        }
    },
    redirect:
    {
        login: '/login',
        logout: '/',
        callback: '/login',
        home: '/admin'
    }
}