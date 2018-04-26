module.exports = function (ngModule) {

    // Html template import.
    let ngModuleHtmlTemplate = require('./authorized-layout.html');

    // Route config.
    ngModule.config(function ($stateProvider, urlStates) {

        // Constants reflection.
        let urlAuthorizedLayoutState = urlStates.authorizedLayout;

        // State configuration
        $stateProvider.state(urlAuthorizedLayoutState.name, {
            controller: 'authorizedLayoutController',
            abstract: true,
            template: ngModuleHtmlTemplate,
            params:{
                cssClassNames: ['hold-transition', 'skin-black', 'fixed', 'sidebar-mini']
            }
        });
    });
};