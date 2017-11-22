module.exports = function (ngModule) {

    // Html template import.
    var ngModuleHtmlTemplate = require('./authorized-layout.html');

    // Route config.
    ngModule.config(function ($stateProvider, urlStates) {

        // Constants reflection.
        var urlAuthorizedLayoutState = urlStates.authorizedLayout;

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