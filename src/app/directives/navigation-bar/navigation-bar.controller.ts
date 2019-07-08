import {IController} from "angular";
import {INavigationBarScope} from "./navigation-bar.scope";
import {StateService} from "@uirouter/core";

/* @ngInject */
export class NavigationBarController implements IController {

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(public $scope: INavigationBarScope,
                       public $state: StateService) {
        this.$scope.clickSignOut = this._clickedSignOut;
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
