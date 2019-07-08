import {ICompileService, IDirective, IQService} from "angular";
import {NavigationBarController} from "./navigation-bar.controller";

/* @ngInject */
export class NavigationBarDirective implements IDirective {

    //#region Properties

    // Directive restriction mode.
    restrict = 'E';

    compile = (): any => {
        let pGetTemplatePromise = this.$q((resolve) => {
            require('./navigation-bar.scss');
            require.ensure([], () => resolve(require('./navigation-bar.html')));
        });

        return (scope, element) => {
            pGetTemplatePromise
                .then((htmlTemplate) => {
                    element.html(htmlTemplate);
                    this.$compile(element.contents())(scope)
                });
        };
    };

    // Directive isolate scope.
    scope = {
        ngOnSignOutClicked: '&?',
        profile: '<?'
    };

    // Directive controller
    controller = NavigationBarController;

    //#endregion

    //#region Constructor

    /*
    * Initialize navigation bar directive with injectors.
    * */
    public constructor(public $q: IQService, public $compile: ICompileService) {
    }

    //#endregion

    //#region Methods


    //#endregion

}
