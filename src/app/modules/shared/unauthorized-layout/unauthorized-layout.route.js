module.exports = (ngModule) => {

    // Import html template.
    let ngModuleHtmlTemplate = require('./unauthorized-layout.html');

    // Import controller.
    require('./unauthorized-layout.controller')(ngModule);

    // Route config.
    ngModule.config( ($stateProvider, urlStatesConstant) => {
        $stateProvider.state(urlStatesConstant.unauthorizedLayout.name, {
            controller: 'unauthorizedLayoutController',
            abstract: true,
            template: ngModuleHtmlTemplate,
            params: {
                cssClassNames: ['hold-transition', 'login-page']
            }
        })
    });
};