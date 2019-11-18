import {IController} from "angular";
import {DetailedUserViewModel} from "../../../../../view-models/user/detailed-user.view-model";
import {IUsersService} from "../../../../../services/interfaces/user-service.interface";
import {IDetailedFoodVendorScope} from "./detailed-food-vendor.scope";
import {AddressViewModel} from "../../../../../view-models/address.view-model";
import {IAppSettings} from "../../../../../interfaces/app-setting.interface";
import {ICoordinate} from "../../../../../interfaces/coordinate.interface";
import {UserRoles} from "../../../../../enums/user-roles.enum";
import {EditFoodVendorViewModel} from "../../../../../view-models/user/edit-food-vendor.view-model";
import {EditableFieldViewModel} from "../../../../../view-models/editable-field.view-model";
import {IBank} from "../../../../../interfaces/bank.interface";
import {IAddress} from "../../../../../interfaces/address.interface";
import {IStatesService} from "../../../../../services/interfaces/state-service.interface";
import {SearchResultViewModel} from "../../../../../view-models/search-result.view-model";
import {StateViewModel} from "../../../../../view-models/state/state-view.model";
import {ICitiesService} from "../../../../../services/interfaces/city-service.interface";
import {LoadCitiesViewModel} from "../../../../../view-models/city/load-cities.view-model";
import {PagerViewModel} from "../../../../../view-models/pager.view-model";
import {ValidationValueConstant} from "../../../../../constants/validation-value.constant";
import {CityViewModel} from "../../../../../view-models/city/city.view-model";

/* @ngInject */
export class DetailedFoodVendorController implements IController {

    //#regon Constructor

    public constructor(detailedUser: DetailedUserViewModel,
                       protected appSettings: IAppSettings,
                       protected $users: IUsersService,
                       protected $states: IStatesService,
                       protected $cities: ICitiesService,
                       protected $scope: IDetailedFoodVendorScope) {

        $scope.detailedUser = detailedUser;
        $scope.loadAddressDisplay = this._loadAddressDisplay;
        $scope.loadGMapUrl = () => appSettings.gMapUrl;
        $scope.loadAddressCoordinate = (coordinate: ICoordinate) => `${coordinate.latitude}, ${coordinate.longitude}`;
        $scope.shouldBankDisplayed = this._shouldBankDisplayed;

        $scope.editFoodVendorModel = new EditFoodVendorViewModel();
        $scope.clickEditDetailedFoodVendor = this._clickEditDetailedFoodVendor;
        $scope.shouldCitiesSelectionDisabled = this._shouldCitiesSelectionDisabled;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {

        this.$states
            .loadWholeStatesAsync()
            .then((states: StateViewModel[]) => {
                this.$scope.availableStates = states;
            });

        this.$scope.$watch('editFoodVendorModel.address.value.stateId', this._clickReloadCities);
    }

    //#endregion

    //#region Internal methods

    protected _loadAddressDisplay = (address: AddressViewModel): string => {
        const items = [address.auxiliaryAddress, address.addressText, address.postalCode, address.cityName, address.stateName];
        return items
            .filter(item => item && item.length)
            .join(",");
    };

    protected _shouldBankDisplayed = (): boolean => {
        const detailedUser = this.$scope.detailedUser;
        if (!detailedUser) {
            return false;
        }

        return this.$users
            .hasRoles(detailedUser.roles, [UserRoles.foodVendor]);
    };

    protected _clickEditDetailedFoodVendor = (): void => {
        let editingVendorProfile = this.$scope.editingVendorProfile;
        const vendor = this.$scope.detailedUser.vendor;

        if (!editingVendorProfile) {
            const model = new EditFoodVendorViewModel();
            model.vendorName = new EditableFieldViewModel<string>(vendor.name, false);
            model.phoneNo = new EditableFieldViewModel<string>(vendor.phoneNo, false);
            model.bank = new EditableFieldViewModel<IBank>(vendor.bank, false);
            model.address = new EditableFieldViewModel<IAddress>(vendor.address, false);

            this.$scope.editFoodVendorModel = model;
            this.$scope.editingVendorProfile = true;
            return;
        }

        this.$scope.editingVendorProfile = false;
    };

    protected _shouldCitiesSelectionDisabled = (): boolean => {
        const availableStates = this.$scope.availableStates;
        const availableCities = this.$scope.availableCities;

        if (!availableStates || !availableCities || !availableCities.length) {
            return true;
        }

        const editVendorModel = this.$scope.editFoodVendorModel;
        if (!editVendorModel) {
            return true;
        }

        if (!editVendorModel.address.value || !editVendorModel.address.value.stateId) {
            return true;
        }

        return false;
    };

    protected _clickReloadCities = (stateId: string): void => {

        if (!stateId) {
            return;
        }

        // Reset city id.
        this.$scope.editFoodVendorModel.address.value.cityId = null;

        const loadCitiesConditions = new LoadCitiesViewModel();
        loadCitiesConditions.stateIds = [stateId];
        loadCitiesConditions.pager = new PagerViewModel();
        loadCitiesConditions.pager.page = 1;
        loadCitiesConditions.pager.records = ValidationValueConstant.maxSupportedSearchRecords;

        this.$cities
            .loadCitiesAsync(loadCitiesConditions)
            .then((loadCitiesResult: SearchResultViewModel<CityViewModel>) => {
                this.$scope.availableCities = loadCitiesResult.items;
            });

    };

    //#endregion

}
