module.exports = (ngModule) => {
    // Directive declaration.
    ngModule.directive('navigationBar', ($compile, $q) => {
        return {
            compile: () => {
                let pGetTemplatePromise = $q((resolve) => {
                    require.ensure([], () => resolve(require('./navigation-bar.html')));
                });

                return (scope, element) => {
                    pGetTemplatePromise
                        .then((htmlTemplate) => {
                            element.html(htmlTemplate);
                            $compile(element.contents())(scope)
                        });
                };
            },
            restrict: 'E',
            scope: null,
            controller: ($scope) => {

                //#region Properties

                // Constants reflection.
                $scope.urlStatesConstant = require('../../constants/url-states.constant.ts').UrlStatesConstant;

                //#endregion
            }
        }
    });
};