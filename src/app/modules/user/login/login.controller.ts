import {IController} from "angular";
import {ILoginScope} from "../../../interfaces/scopes/login-scope.interface";
import {StateService} from "@uirouter/core";
import {UrlStatesConstant} from "../../../constants/url-states.constant";

/*ngInject*/
export class LoginController implements IController {

    //#region Constructor

    public constructor(public $scope: ILoginScope,
                       public $state: StateService) {

        // Methods binding.
        $scope.ngOnLoginClicked = this._ngOnLoginClicked;
    }

    //#endregion

    //#region Methods

    // Called when login is clicked.
    private _ngOnLoginClicked = (): void => {
        this.$state
            .go(UrlStatesConstant.dashboardModuleName);
    }

    //#endregion
}