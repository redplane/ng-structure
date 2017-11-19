module.exports = function (ngModule) {

    //#region Module configs.

    // Load module html template.
    var ngModuleHtmlTemplate = require('./login.html');

    /*
    * Module configuration.
    * */
    ngModule.config(function ($stateProvider, urlStates) {
        $stateProvider.state(urlStates.login.name, {
            url: urlStates.login.url,
            controller: 'loginController',
            template: ngModuleHtmlTemplate,
            parent: urlStates.unauthorizedLayout.name
        })
    });

    //#endregion
};