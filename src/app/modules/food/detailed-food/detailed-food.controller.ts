import {IController} from "angular";
import {FoodViewModel} from "../../../view-models/food/food.view-model";
import {IDetailedFoodScope} from "./detailed-food.scope";
import {CarouselItem} from "../../../models/carousel-item";
import {IFoodService} from "../../../services/interfaces/foods-service.interface";

export class DetailedFoodController implements IController {

    //#region Constructor

    public constructor(detailedFood: FoodViewModel,
                       protected $foods: IFoodService,
                       protected $scope: IDetailedFoodScope) {

        const carouselItems: CarouselItem[] = [];
        const photos = detailedFood.photos;
        for (let index = 0; index < 3; index++) {
            let photoUrl = 'https://via.placeholder.com/640x480';
            if (index < photos.length) {
                photoUrl = photos[index];
            }

            carouselItems.push(new CarouselItem(photoUrl, detailedFood.description, index));
        }

        $scope.carouselItems = carouselItems;
        $scope.detailedFood = detailedFood;

        $scope.loadFoodTypeTitle = $foods.loadFoodTypeTitle;
        $scope.loadFoodCategoryTitle = $foods.loadFoodCategoryTitle;
        $scope.loadFoodStatusTitle = $foods.loadFoodStatusTitle;
        $scope.shouldPromotionValid = $foods.shouldPromotionValid;

    }

    //#endregion

    //#region Methods

    //#endregion
}
