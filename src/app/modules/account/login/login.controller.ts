import {ILoginScope} from "./login.scope";
import {LoginViewModel} from "../../../view-models/user/login.view-model";

export class LoginController implements ng.IController{

    //#region Properties

    public email: string = '123456';

    //#endregion

    //#region Constructor

    /*
    * Initialize controller with injectors.
    * */
    public constructor(public $scope: ILoginScope){
        this.$scope.loginModel = new LoginViewModel();
        this.$scope.loginModel.email = '123'
        this.$scope.hasEmail = this.hasEmail;
    }

    //#endregion

    //#region Methods

    //#endregion

    //#region Events

    public clickLogin(): void {
        console.log('Hello world');
    }

    public hasEmail(): boolean{
        let loginModel = this.$scope.loginModel;
        if (!loginModel || !loginModel.email)
            return false;

        return true;
    }

    //#endregion
}