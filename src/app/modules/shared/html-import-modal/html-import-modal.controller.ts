import {IController} from "angular";
import {IHtmlImportModalScope} from "./html-import-modal.scope";

/* @ngInject */
export class HtmlImportModalController implements IController {

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(protected $scope: IHtmlImportModalScope) {

        $scope.clickCloseModal = this._clickCloseModal;
        $scope.clickDismissModal = this._clickCancel;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
    };

    //#endregion

    //#region Internal methods

    protected _clickCloseModal = (): void => {
        this.$scope.$close(this.$scope.htmlContent);
    };

    protected _clickCancel = (): void => {
        // Close the modal dialog.
        this.$scope.$dismiss('Manual closed');
    };

    //#endregion
}
