module.exports = (ngModule) => {

    // Module html template import.
    let ngModuleHtmlTemplate = require('./main.html');

    ngModule.config(($stateProvider, urlStatesConstant) => {

        let urlStateDashboard = urlStatesConstant.dashboard;
        let urlStateAuthorizedLayout = urlStatesConstant.authorizedLayout;

        $stateProvider.state(urlStateDashboard.name, {
            url: urlStateDashboard.url,
            controller: 'mainDashboardController',
            parent: urlStateAuthorizedLayout.name,
            template: ngModuleHtmlTemplate
        });
    });
};