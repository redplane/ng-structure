export class LoginViewModel {

    //#region Properties

    /*
    * Email that is used for logging into system.
    * */
    public email: string | null;

    /*
    * Password is used for logging into system.
    * */
    public password: string | null;

    //#endregion

    //#region Constructor

    /*
    * Initialize model with settings.
    * */
    public constructor() {
        this.email = null;
        this.password = null;
    }

    //#endregion

}