import {IFormController, INgModelController} from "angular";

export interface IDetailedMailTemplateForm extends IFormController {

    //#region Properties

    name: INgModelController;

    subject: INgModelController;

    description: INgModelController;

    content: INgModelController;

    availability: INgModelController;

    //#endregion

}
