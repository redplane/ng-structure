// Load module html templates.
var ngLoginHtml = require('./login/login.html');

module.exports = function(ngModule){

    require('./login/login.controller')(ngModule);

    /*
    * Routes configuration.
    * */
    ngModule.config(function($stateProvider){
       $stateProvider.state('login', {
           url: '/login',
           template: ngLoginHtml,
           controller: 'loginController'
       })
    });
};
