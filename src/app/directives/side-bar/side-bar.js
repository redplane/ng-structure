module.exports = (ngModule) => {
    // Directive declaration.
    ngModule.directive('sideBar', ($compile, $q) => {
        return {
            restrict: 'E',
            scope: null,
            compile: () => {
                let pGetTemplatePromise = $q((resolve) => {
                    require.ensure([], () => resolve(require('./side-bar.html')));
                });

                return (scope, element) => {
                    pGetTemplatePromise
                        .then((htmlTemplate) => {
                            element.html(htmlTemplate);
                            $compile(element.contents())(scope)
                        });
                };
            },
            controller: ($scope, urlStatesConstant) => {

                //#region Properties

                // Constants reflection.
                $scope.urlStates = urlStatesConstant;

                $scope.message = 'Hello world';
                //#endregion
            },
            link: (scope, element, attrs) => {

            }
        }
    });
};