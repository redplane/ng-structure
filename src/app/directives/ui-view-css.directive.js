module.exports = function (ngModule) {
    ngModule.directive('uiViewCss', function ($transitions) {
        return {
            restrict: 'A',
            scope: null,
            link: function (scope, element, attr, controller) {

                $transitions.onSuccess({}, function (transitions) {
                    // Find parameters in transitions.
                    var params = transitions.params();

                    if (!params)
                        return;

                    // Get class names which should be applied to element.
                    var classes = params['cssClassNames'];
                    if (!classes || classes.length < 1)
                        return;

                    var jElement = $(element);
                    if (!jElement)
                        return;

                    for (var index = 0; index < classes.length; index++) {
                        var szClassName = classes[index];
                        if (jElement.hasClass(szClassName))
                            continue;
                        jElement.addClass(szClassName);
                    }
                });
            }
        };
    });
};