module.exports = function (ngModule) {

    // Module template import.
    var ngModuleHtmlTemplate = require('./navigation-bar.html');

    // Directive declaration.
    ngModule.directive('navigationBar', function () {
        return {
            template: ngModuleHtmlTemplate,
            restrict: 'E',
            scope: null,
            controller: function(){

            }
        }
    });
};