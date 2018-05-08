module.exports = (ngModule) => {

    //#region Module configs.

    // Load module html template.
    let ngModuleHtmlTemplate = require('./login.html');

    /*
    * Module configuration.
    * */
    ngModule.config(($stateProvider, urlStatesConstant) => {
        $stateProvider.state(urlStatesConstant.login.name, {
            url: urlStatesConstant.login.url,
            controller: 'loginController',
            template: ngModuleHtmlTemplate,
            parent: urlStatesConstant.unauthorizedLayout.name
        })
    });

    //#endregion
};