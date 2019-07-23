import {UrlStatesConstant} from "../../constants/url-states.constant";

export interface ISidebarScope {

    //#region Properties

    urlStatesConstant: UrlStatesConstant;

    //#endregion

    //#region Methods

    /*
    * Called when a nav item is clicked to change state.
    * */
    clickChangeState(stateName: string): void;

    //#endregion
}
