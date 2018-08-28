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
            scope: {

                // Raised when sign out is clicked.
                ngOnSignOutClicked: '&?'
            },
            controller: ($scope) => {

                //#region Properties

                // Constants reflection.
                $scope.urlStatesConstant = UrlStatesConstants;

                //#endregion

                //#region Methods

                /*
                * Called when sign out is clicked.
                * */
                $scope._ngSignOutClicked = () => {
                    if (!$scope.ngOnSignOutClicked)
                        return;

                    $scope.ngOnSignOutClicked();
                }

                //#endregion
            }
        }
    });
};