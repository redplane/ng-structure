import {BaseEntity} from "../base-entity.view-model";
import {MailTemplateKinds} from "../../enums/mail-template-kinds.enum";

export class MailTemplateViewModel extends BaseEntity {

    //#region Properties

    public name: string;

    public subject: string;

    public content: string;

    public kind: MailTemplateKinds;

    public description: string;

    //#endregion

}
