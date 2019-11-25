import {IController, IPromise, IQService} from "angular";
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
                       defaultImage: string,
                       protected $scope: IPhotoCropperModalScope,
                       protected $uibModalInstance: IModalInstanceService,
                       protected $q: IQService) {
        this._modalOptions = modalOptions;
        this.$scope.modalId = modalId;
        this.$scope.fileSelectorId = `${modalId}-fileSelector`;
        this.$scope.imageUrl = defaultImage;

        $scope.clickChangeImage = this._clickChangeImage;
        $scope.clickDismissModal = this._clickDismissModal;
        $scope.selectFile = this._selectFile;
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
                this.$scope.imageCropper.replace(this.$scope.imageUrl);
            })
    }

    protected _clickOk = (): void => {
        this.$scope.imageCropper.setDragMode('crop');
        this.$scope.imageCropper.getCroppedCanvas()
            .toBlob(blob => {
                this.$scope.$close(blob);
            });
    };

    protected _clickDismissModal = (): void => {
        this.$scope.$dismiss();
    };

    protected _clickChangeImage = (): void => {
        // Find the file selector.
        const control = document.getElementById(this.$scope.fileSelectorId);
        if (!control) {
            return;
        }

        control.click();
    };

    protected _selectFile = (event: HTMLInputElement): void => {

        if (!event || !event.files) {
            return;
        }

        const files = event.files;
        if (!files.length) {
            return;
        }

        // Get the first file.
        const image = files[0];
        event.value = null;

        this._loadFileDataUrlAsync(image)
            .then(dataUrl => {
                this.$scope.imageUrl = dataUrl;
                this.$scope.imageCropper.replace(dataUrl);
            });
    };

    private _loadFileDataUrlAsync = (file: File): IPromise<any> => {
        const fileReader = new FileReader();
        const loadFileContentPromise = this
            .$q(resolve => {
                fileReader.onload = () => {
                    const content = fileReader.result;
                    resolve(content);
                };
            });

        fileReader.readAsDataURL(file);
        return loadFileContentPromise;
    }

    //#endregion
}
