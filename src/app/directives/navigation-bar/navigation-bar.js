module.exports = (ngModule) => {

    // Import constants.
    const UrlStatesConstants = require('../../constants/url-states.constant').UrlStatesConstant;

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
                $scope.urlStatesConstant = UrlStatesConstants;

                //#endregion
            }
        }
    });
};