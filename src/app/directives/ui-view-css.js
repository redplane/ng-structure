module.exports = (ngModule) => {
    ngModule.directive('uiViewCss', ($transitions) => {
        return {
            restrict: 'A',
            scope: null,
            link: (scope, element, attr, controller) => {

                $transitions.onSuccess({}, function (transitions) {
                    // Find parameters in transitions.
                    let params = transitions.params();

                    if (!params)
                        return;

                    // Get class names which should be applied to element.
                    let classes = params['cssClassNames'];
                    if (!classes || classes.length < 1)
                        return;

                    let jElement = $(element);
                    if (!jElement)
                        return;

                    for (let index = 0; index < classes.length; index++) {
                        let szClassName = classes[index];
                        if (jElement.hasClass(szClassName))
                            continue;
                        jElement.addClass(szClassName);
                    }
                });
            }
        };
    });
};