require('./main/main.controller');

module.exports = function(ngModule){
    ngModule.config(function($stateProvider){
       $stateProvider.state('main-dashboard', {
           url: '/dashboard/main',
           templateUrl: '/modules/dashboard/main/main.html',
           controller: 'homeController'
       });
    });
};