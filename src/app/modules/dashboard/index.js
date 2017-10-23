// Load modules templates.
var ngMainDashboardTemplate = require('./main/main.html');

module.exports = function(ngModule){
    /*
    * Controllers gathering.
    * */
    require('./main/main.controller')(ngModule);

    /*
    * Module configuration.
    * */
    ngModule.config(function($stateProvider){
       $stateProvider.state('main-dashboard', {
           url: '/dashboard/main',
           template: ngMainDashboardTemplate,
           controller: 'mainDashboardController'
       });
    });
};