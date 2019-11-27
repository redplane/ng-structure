import {IController, IPromise, IQService} from "angular";
import {IAppointmentManagementScope} from "./appointment-management.scope";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {INgRxMessageBusService} from "../../services/interfaces/ngrx-message-bus-service.interface";
import {IMessageModalsService} from "../shared/message-modal/message-modals-service.interface";
import {IModalButton} from "../shared/message-modal/modal-button.interface";
import {ModalButton} from "../shared/message-modal/modal-button";
import {CloudDeviceViewModel} from "../../view-models/cloud-device/cloud-device.view-model";
import {IUsersService} from "../../services/interfaces/user-service.interface";
import {IAppointmentsService} from "../../services/implementations/appointments-service.interface";
import {LoadAppointmentViewModel} from "../../view-models/appointment/load-appointment.view-model";
import {DetailedAppointmentViewModel} from "../../view-models/appointment/detailed-appointment.view-model";
import {SetupAppointmentModalService} from "./setup-appointment-modal/setup-appointment-modal.service";
import {SetupAppointmentViewModel} from "../../view-models/appointment/setup-appointment.view-model";

export class AppointmentManagementController implements IController {

    //#region Constructor

    public constructor(protected $scope: IAppointmentManagementScope,
                       protected $messageBus: INgRxMessageBusService,
                       protected $messageModals: IMessageModalsService,
                       protected $translate: angular.translate.ITranslateService,
                       protected $users: IUsersService,
                       protected $appointments: IAppointmentsService,
                       protected $setupAppointmentModals: SetupAppointmentModalService,
                       protected $q: IQService) {
        $scope.loadAppointmentsCondition = new LoadAppointmentViewModel();
        $scope.loadAppointmentsResult = new SearchResultViewModel<DetailedAppointmentViewModel>();

        $scope.shouldAppointmentsDisplayed = this._shouldAppointmentsDisplayed;
        $scope.clickReloadAppointments = this._clickReloadAppointments;
        $scope.clickDeleteCloudDevice = this._clickDeleteCloudDevice;
        $scope.clickSetupAppointment = this._clickSetupAppointment;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this._clickReloadAppointments(1);
    }

    //#endregion

    //#region Internal methods

    protected _shouldAppointmentsDisplayed = (): boolean => {
        const loadItemsResult = this.$scope.loadAppointmentsResult;
        if (!loadItemsResult) {
            return false;
        }

        const items = loadItemsResult.items;
        return (items && items.length > 0);
    };

    protected _clickReloadAppointments = (page?: number): void => {

        if (page > 0) {
            this.$scope.loadAppointmentsCondition.pager.page = page;
        }
        this._loadAppointmentsAsync(this.$scope.loadAppointmentsCondition);
    };

    // protected _clickAddPhrase = (): void => {
    //     this.$detailedPhraseModals
    //         .displayAddPhraseModalAsync()
    //         .then((addPhraseModel: AddPhraseViewModel) => {
    //
    //             // Display loading screen.
    //             this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, true);
    //             this.$scope.loadingPhrases = true;
    //
    //             return this.$phrases
    //                 .addPhraseAsync(addPhraseModel)
    //                 .then(() => {
    //                     return this.$phrases
    //                         .loadPhrasesAsync(this.$scope.loadPhrasesCondition);
    //                 })
    //                 .finally(() => {
    //                     this.$scope.loadingPhrases = false;
    //                     this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false);
    //                 });
    //         })
    //         .then((loadPhrasesResult: SearchResultViewModel<PhraseViewModel>) => {
    //             this.$scope.loadPhrasesResult = loadPhrasesResult;
    //         })
    // };

    protected _clickDeleteCloudDevice = (cloudDevice: CloudDeviceViewModel): void => {
        const translatedTitle = this.$translate.instant('TITLE_DELETE_CLOUD_DEVICE');
        const translatedContent = this.$translate.instant('MSG_DELETE_CLOUD_DEVICE', cloudDevice);
        const translatedOk = this.$translate.instant('TITLE_OK');
        const translatedCancel = this.$translate.instant('TITLE_CANCEL');

        const buttons: IModalButton[] = [];

        buttons.push(new ModalButton(this.$q.resolve, translatedOk, {'btn btn-outline-danger': true}));
        buttons.push(new ModalButton(this.$q.reject, translatedCancel, {'btn btn-outline-secondary': true}));

        this.$messageModals
            .displayBasicModalAsync<string>({
                htmlTitle: `<b>${translatedTitle}</b>`,
                htmlContent: `${translatedContent}`,
                bodyClass: {
                    'text-center': true
                },
                footerClass: {
                    'justify-content-center': true
                },
                buttons: buttons
            })
            .then((mode: string) => {
                return null;
            });
    };

    protected _clickSetupAppointment = (): void => {
        this.$setupAppointmentModals
            .displaySetupAppointmentModalAsync()
            .then((appointmentSetupModel: SetupAppointmentViewModel) => {
                return this.$appointments
                    .setupAppointmentAsync(appointmentSetupModel);
            })
            .then(() => {
                return this._loadAppointmentsAsync(this.$scope.loadAppointmentsCondition);
            });
    };

    protected _loadAppointmentsAsync = (condition: LoadAppointmentViewModel): IPromise<SearchResultViewModel<DetailedAppointmentViewModel>> => {

        // Mark loading progress to be pending
        this.$scope.loadingAppointments = true;

        return this.$appointments
            .loadDetailedAppointmentsAsync(condition)
            .then((loadDetailedAppointmentsResult: SearchResultViewModel<DetailedAppointmentViewModel>) => {
                this.$scope.loadAppointmentsResult = loadDetailedAppointmentsResult;
                return loadDetailedAppointmentsResult;
            })
            .finally(() => {
                this.$scope.loadingAppointments = false;
            });
    }


    //#endregion
}
