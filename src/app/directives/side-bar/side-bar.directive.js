module.exports = function(ngModule){
    // Module template import.
    var ngModuleHtmlTemplate = require('./side-bar.html');

    // Directive declaration.
    ngModule.directive('sideBar', function () {
        return {
            template: ngModuleHtmlTemplate,
            restrict: 'E',
            scope: null,
            controller: function($scope, urlStates){

                //#region Properties

                // Constants reflection.
                $scope.urlStates = urlStates;
                //#endregion
            }
        }
    });
};