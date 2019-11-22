import {IPromise} from "angular";
import {IBasicMessageModalOptions} from "./basic-message-modal-option.interface";

export interface IMessageModalsService {

    //#region Methods

    displayBasicModalAsync<T>(options: IBasicMessageModalOptions): IPromise<T>;

    //#endregion

}