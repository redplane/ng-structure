import {UserStatuses} from "../../enums/user-statuses.enum";
import {UserRoles} from "../../enums/user-roles.enum";

export class UserViewModel {

    //#region Properties

    public id: string;

    public username: string;

    public fullName: string;

    public phoneNo: string;

    public roles: UserRoles[];

    public photo: string;

    public status: UserStatuses;

    public joinedTime: number;

    //#endregion

}
