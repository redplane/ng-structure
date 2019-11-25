import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";

export class AddPhraseViewModel {

    //#region Properties

    public text: string;

    public availability: MasterItemAvailabilities;

    //#endregion

    //#region Constructor

    public constructor() {
        this.text = '';
        this.availability = MasterItemAvailabilities.available;
    }

    //#endregion

}
