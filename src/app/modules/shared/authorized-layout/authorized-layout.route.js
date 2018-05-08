module.exports = (ngModule) => {

    // Html template import.
    let ngModuleHtmlTemplate = require('./authorized-layout.html');

    // Route config.
    ngModule.config(($stateProvider, urlStatesConstant) => {

        // Constants reflection.
        let urlAuthorizedLayoutState = urlStatesConstant.authorizedLayout;

        // State configuration
        $stateProvider.state(urlAuthorizedLayoutState.name, {
            controller: 'authorizedLayoutController',
            abstract: true,
            template: ngModuleHtmlTemplate,
            params: {
                cssClassNames: ['hold-transition', 'skin-black', 'fixed', 'sidebar-mini']
            }
        });
    });
};