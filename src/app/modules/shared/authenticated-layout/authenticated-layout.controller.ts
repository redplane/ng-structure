import {IController} from "angular";
import {IAuthenticatedLayoutScope} from "./authenticated-layout.scope";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {StateService} from "@uirouter/core";
import {ProfileViewModel} from "../../../view-models/user/profile.view-model";

/* @ngInject */
export class AuthenticatedLayoutController implements IController {

    //#region Constructor

    public constructor(protected $scope: IAuthenticatedLayoutScope,
                       protected $state: StateService,
                       protected profile: ProfileViewModel) {

        // Properties binding.
        this.$scope.profile = profile;

        // Methods binding.
        this.$scope.ngOnSignOutClicked = this.ngOnSignOutClicked;
    }

    //#endregion

    //#region Methods

    /*
    * Called when sign out is clicked.
    * */
    public ngOnSignOutClicked = (): void => {
        this.$state.go(UrlStatesConstant.loginModuleName);
    };

    //#endregion
}
