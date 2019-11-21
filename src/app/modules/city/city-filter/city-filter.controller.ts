import {IController} from "angular";
import {ICityFilterScope} from "./city-filter.scope";

/* @ngInject */
export class CityFilterController implements IController {

    //#region Constructor

    public constructor(protected $scope: ICityFilterScope) {

        // Properties binding.
        this.$scope.availableStates = this.$scope.$resolve.states;

        // Method binding.
        this.$scope.closeModal = this.closeModal;
    }

    //#endregion

    //#region Methods

    /*
    * Close modal.
    * */
    protected closeModal = () => {
        this.$scope.$dismiss();
    }

    //#endregion
}
