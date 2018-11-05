import {IController} from "angular";
import {IAuthorizedLayoutScope} from "./master-layoutscope";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {StateService} from "@uirouter/core";

/* @ngInject */
export class MasterLayoutController implements IController {

    //#region Constructor

    public constructor(public $scope: IAuthorizedLayoutScope,
                       public $state: StateService) {
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