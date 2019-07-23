import {ICompileService, IDirective, IQService} from "angular";
import {SidebarController} from "./sidebar.controller";


/* @ngInject */
export class SidebarDirective implements IDirective {

    //#region Properties

    // Directive restriction mode.
    restrict = 'E';

    compile = (): any => {
        let pGetTemplatePromise = this.$q((resolve) => {
            require('./sidebar.scss');
            require.ensure([], () => resolve(require('./sidebar.html')));
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
    };

    // Directive controller
    controller = SidebarController;

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