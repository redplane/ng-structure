import {ILoginScope} from "./login.scope";
import {LoginViewModel} from "../../../view-models/user/login.view-model";
import {IController} from "angular";
import {StateService} from "../../../../../node_modules/@uirouter/core";
import {UrlStatesConstant} from "../../../constants/url-states.constant";

/* @ngInject */
export class LoginController implements IController{

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(public $state: StateService,
                       public $scope: ILoginScope){
        $scope.clickLogin = this.clickLogin;
        $scope.getMessages = this.getMessages;

        let loginModel = new LoginViewModel();
        loginModel.email = 'This is email';
        loginModel.password = 'This is password';
        $scope.loginModel = loginModel;
    }

    //#endregion

    //#region Methods

    //#endregion

    //#region Events

    public clickLogin = (): void => {
        this.$state.go(UrlStatesConstant.dashboardModuleName);
    };

    public getMessages = (): string => {
        return this.print();
    };

    public print = (): string => {
        return 'printf';
    }

    //#endregion
}