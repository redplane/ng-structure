import {IController} from "angular";
import {IPhotoCropperModalScope} from "./photo-cropper-modal.scope";
import {IModalInstanceService} from "angular-ui-bootstrap";
import Cropper from 'cropperjs/dist/cropper.esm';

export class PhotoCropperModalController implements IController {

    //#region Properties

    private _modalOptions: Cropper.Options;

    //#endregion

    //#region Constructor

    public constructor(modalId: string,
                       modalOptions: Cropper.Options,
                       protected $scope: IPhotoCropperModalScope,
                       protected $uibModalInstance: IModalInstanceService) {
        this._modalOptions = modalOptions;
        this.$scope.modalId = modalId;

        $scope.clickDismissModal = this._clickDismissModal;
        $scope.clickOk = this._clickOk;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this.$uibModalInstance
            .rendered
            .then(() => {
                const element = document.getElementById(this.$scope.modalId);
                const cropper = new Cropper(element, this._modalOptions);
                this.$scope.imageCropper = cropper;
            })
    }

    protected _clickOk = (): void => {
      this.$scope.imageCropper.setDragMode('crop');
      const data = this.$scope.imageCropper.getCroppedCanvas()
          .toBlob(blob => console.log(blob));
      console.log(data);
    };

    protected _clickDismissModal = (): void => {
        this.$scope.$dismiss();
    };

    //#endregion
}
