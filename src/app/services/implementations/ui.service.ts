import {IUiService} from "../interfaces/ui-service.interface";

/* @ngInject */
export class UiService implements IUiService{

    //#region Constructor

    public constructor(public $window: ng.IWindowService){

    }

    //#endregion

    //#region Methods

    // Display alert message.
    public alert(message: string): void {
        this.$window.alert(message);
    };


    //#endregion
}
