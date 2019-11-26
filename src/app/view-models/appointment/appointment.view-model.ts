import {BaseEntity} from "../base-entity.view-model";
import {AppointmentStatuses} from "../../enums/appoint-statuses.enum";

export class AppointmentViewModel extends BaseEntity {

    public foodVendorId: string;

    public adminId?: string;

    public siteVisitTime?: number;

    public status: AppointmentStatuses;
}