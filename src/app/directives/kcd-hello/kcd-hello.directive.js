// Find directive html template.
var ngTemplate = require('./kcd-hello.directive.html');

module.exports = function(ngModule){
    /*
    * Directive declaration.
    * */
    ngModule.directive('kcdHello', function(){
        return {
            template: ngTemplate,
            restrict: 'E',
            scope: {},
            controller: function($scope, appSettings){
                $scope.message = 'Hello world';
                $scope.title = appSettings.title;
            }
        }
    });
};