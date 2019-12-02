import {module} from 'angular';
import {FoodTypePickerModalService} from "./food-type-picker-modal.service";

export default module('ngFoodTypePickerModalModule', ['ui.bootstrap.modal'])
    .service('$foodTypePickerModals', FoodTypePickerModalService)
    .name;
