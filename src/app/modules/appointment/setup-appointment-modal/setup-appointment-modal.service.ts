import {IPromise} from "angular";
import {PhraseViewModel} from "../../../view-models/phrase/phrase.view-model";
import {AddPhraseViewModel} from "../../../view-models/phrase/add-phrase.view-model";
import {EditPhraseViewModel} from "../../../view-models/phrase/edit-phrase.view-model";

export class SetupAppointmentModalService {

    //#region Constructor

    public constructor(protected $uibModal: ng.ui.bootstrap.IModalService) {

    }

    //#endregion

    //#region Methods

    public displaySetupAppointmentModalAsync(): IPromise<any> {

        const {SetupAppointmentModalController} = require('./setup-appointment-modal.controller');
        const modalTemplate = require('./setup-appointment-modal.html');

        return this.$uibModal
            .open({
                template: modalTemplate,
                controller: SetupAppointmentModalController,
                backdrop: 'static'
            })
            .result;
    };

    //#endregion

}
