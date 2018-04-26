module.exports = function (ngModule) {

    // Module html template import.
    let ngModuleHtmlTemplate = require('./main.html');

    ngModule.config(function ($stateProvider, urlStates) {

        let urlStateDashboard = urlStates.dashboard;
        let urlStateAuthorizedLayout = urlStates.authorizedLayout;

        $stateProvider.state(urlStateDashboard.name, {
            url: urlStateDashboard.url,
            controller: 'mainDashboardController',
            parent: urlStateAuthorizedLayout.name,
            template: ngModuleHtmlTemplate
        });
    });
};