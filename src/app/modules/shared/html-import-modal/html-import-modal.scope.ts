import {IScope} from "angular";
import {IModalScope} from "angular-ui-bootstrap";

export interface IHtmlImportModalScope extends IScope, IModalScope {

    //#region Properties

    htmlContent: string;

    //#endregion

    //#region Methods

    clickCloseModal(): void;

    clickDismissModal(): void;

    //#endregion
}
