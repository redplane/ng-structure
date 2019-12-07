import {MailTemplateKinds} from "../../enums/mail-template-kinds.enum";
import {MasterItemAvailabilities} from "../../enums/master-item-availabilities.enum";

export class AddMailTemplateViewModel {

    //#region Properties

    public name: string;

    public subject: string;

    public content: string;

    public description: string;

    public kind: MailTemplateKinds;

    public availability: MasterItemAvailabilities;

    //#endregion

}
