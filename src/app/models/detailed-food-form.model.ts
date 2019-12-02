import {IFormController, INgModelController} from "angular";

export interface IDetailedFoodForm extends IFormController {

    //#region Properties

    name: INgModelController;

    price: INgModelController;

    description: INgModelController;

    ingredient: INgModelController;

    status: INgModelController;

    category: INgModelController;

    minimumOrderQuantity: INgModelController;

    shouldPromotionEnabled: INgModelController;

    promotionStartTime: INgModelController;

    promotionEndTime: INgModelController;

    discountPrice: INgModelController;

    types: INgModelController;

    assignedLocations: INgModelController;

    //#endregion

}
