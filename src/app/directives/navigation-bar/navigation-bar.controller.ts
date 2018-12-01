import {IController} from "angular";
import {INavigationBarScope} from "../../interfaces/scopes/navigation-bar-scope.interface";
import {StateService} from "@uirouter/core";

/* @ngInject */
export class NavigationBarController implements IController {

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(public $scope: INavigationBarScope, public $state: StateService) {
        this.$scope.ngClickedSignOut = this._clickedSignOut;
    }

    //#endregion

    //#region Methods

    // Called when login is clicked.
    private _clickedSignOut = ($event: Event): void => {

        if ($event) {
            $event.preventDefault();
        }
        
        if (!this.$scope.ngOnSignOutClicked)
            return;

        this.$scope.ngOnSignOutClicked();
    };

    //#endregion
}