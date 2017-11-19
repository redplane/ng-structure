module.exports = function (ngModule) {

    /*
    * Application constants declaration.
    * */
    ngModule.constant('urlStates', {
        login:{
            url: '/login',
            name: 'login'
        },

        dashboard: {
            url: '/dashboard',
            name: 'dashboard'
        },

        authorizedLayout: {
            name: 'authorized-layout'
        },

        unauthorizedLayout: {
            name: 'unauthorized-layout'
        }
    });
};