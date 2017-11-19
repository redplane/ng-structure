module.exports = function (ngModule) {

    // Module html template import.
    var ngModuleHtmlTemplate = require('./main.html');

    ngModule.config(function ($stateProvider, urlStates) {

        var urlStateDashboard = urlStates.dashboard;
        var urlStateAuthorizedLayout = urlStates.authorizedLayout;

        $stateProvider.state(urlStateDashboard.name, {
            url: urlStateDashboard.url,
            controller: 'mainDashboardController',
            parent: urlStateAuthorizedLayout.name,
            template: ngModuleHtmlTemplate
        });
    });
};