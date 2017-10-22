require('./login/login.controller')(ngModule);

module.exports = function(ngModule){
    /*
    * Routes configuration.
    * */
    ngModule.config(function($stateProvider){
       $stateProvider.state('login', {
           url: '/login',
           templateUrl: '/modules/account/login/login.html',
           controller: 'loginController'
       })
    });
};
