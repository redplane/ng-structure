module.exports = function(ngModule){

    /*
    * Directive declaration.
    * */
    ngModule.directive('kcdHello', function(){
        return {
            templateUrl: '/directives/kcd-hello/kcd-hello.directive.html',
            restrict: 'E',
            scope: {},
            controller: function($scope){
                $scope.message = 'Hello world';
            }
        }
    });
};