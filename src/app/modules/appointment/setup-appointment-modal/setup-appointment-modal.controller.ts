import {IController, IPromise, IQService} from "angular";
import {IModalInstanceService} from "angular-ui-bootstrap";
import {UserViewModel} from "../../../view-models/user/user.view-model";
import {IUsersService} from "../../../services/interfaces/user-service.interface";
import {LoadFoodVendorViewModel} from "../../../view-models/user/load-food-vendor.view-model";
import {PagerViewModel} from "../../../view-models/pager.view-model";
import {IAppointmentSetupScope} from "./setup-appointment-modal.scope";
import {SetupAppointmentViewModel} from "../../../view-models/appointment/setup-appointment.view-model";

export class SetupAppointmentModalController implements IController {

    //#region Constructor

    public constructor(protected $scope: IAppointmentSetupScope,
                       protected $translate: angular.translate.ITranslateService,
                       protected $uibModalInstance: IModalInstanceService,
                       protected $users: IUsersService,
                       protected $q: IQService) {

        $scope.ngModelOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };

        const currentTime = new Date();
        let minTime = new Date(currentTime.setHours(0, 0, 0, 0));
        minTime.setDate(minTime.getDate() + 1);
        $scope.datePickerOptions = {
            minDate: minTime
        };

        $scope.clickDismissModal = this._clickDismissModal;
        $scope.clickSetupAppointment = this._clickSetupAppointment;
        $scope.loadAvailableFoodVendorsAsync = this._loadAvailableFoodVendorsAsync;
    }

    //#endregion

    //#region Methods


    protected _clickDismissModal = (): void => {
        this.$uibModalInstance.dismiss();
    };

    protected _clickSetupAppointment = (): void => {

        const selectedUser = this.$scope.selectedUser;
        const selectedTime = this.$scope.selectedAppointmentTime;

        if (!selectedUser || !selectedUser.id) {
            return;
        }

        const model = new SetupAppointmentViewModel();
        model.foodVendorId = selectedUser.id;
        model.appointmentTime = selectedTime.getTime();

        this.$uibModalInstance
            .close(model);
    };

    protected _loadAvailableFoodVendorsAsync = (username: string): IPromise<UserViewModel[]> => {
        const loadFoodVendorsCondition = new LoadFoodVendorViewModel();
        loadFoodVendorsCondition.username = username;
        loadFoodVendorsCondition.pager = new PagerViewModel(1, 10);

        return this.$users
            .loadFoodVendorsAsync(loadFoodVendorsCondition)
            .then(m => m.items);
    };

    //#endregion
}
