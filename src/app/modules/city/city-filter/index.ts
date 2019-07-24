import {ICompileService, IDirective, IQService} from "angular";
import {CityFilterController} from "./city-filter.controller";

/* @ngInject */
export class CityFilterDirective implements IDirective {

    //#region Properties

    // Directive restriction mode.
    restrict = 'E';

    compile = (): any => {
        let pGetTemplatePromise = this.$q((resolve) => {
            require.ensure([], () => resolve(require('./city-filter.html')));
        });

        return (scope, element) => {
            pGetTemplatePromise
                .then((htmlTemplate) => {
                    element.html(htmlTemplate);
                    this.$compile(element.contents())(scope)
                });
        };
    };

    // Directive controller
    controller = CityFilterController;

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
