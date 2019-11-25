import {IController, IPromise, IQService} from "angular";
import {IDetailedStickerModalScope} from "./detailed-sticker-modal.scope";
import {StickerViewModel} from "../../../view-models/stickers/sticker.view-model";
import {IModalInstanceService} from "angular-ui-bootstrap";
import * as uuid from 'uuid/v1';
import Cropper from 'cropperjs/dist/cropper.esm.js';
import {AddStickerViewModel} from "../../../view-models/stickers/add-sticker.view-model";
import {KeyValueModel} from "../../../models/key-value.model";
import {EditStickerViewModel} from "../../../view-models/stickers/edit-sticker.view-model";
import {EditableFieldViewModel} from "../../../view-models/editable-field.view-model";

export class DetailedStickerModalController implements IController {

    //#region Constructor

    public constructor(protected $scope: IDetailedStickerModalScope,
                       protected $translate: angular.translate.ITranslateService,
                       protected $uibModalInstance: IModalInstanceService,
                       protected $q: IQService,
                       detailedSticker: StickerViewModel) {

        $scope.initialModel = {...detailedSticker};
        $scope.imageControlId = uuid();
        $scope.filePickerControlId = uuid();
        $scope.availableTrueFalseSelections = [
            new KeyValueModel('TITLE_YES', true),
            new KeyValueModel('TITLE_NO', false),
        ];

        $scope.photo = new EditableFieldViewModel<Blob>(null, false);

        if (detailedSticker && detailedSticker.id) {
            $scope.name = new EditableFieldViewModel<string>(detailedSticker.name, false);
            $scope.selectedImageUrl = detailedSticker.photoUrl;
        }

        $scope.loadModalTitle = this._loadModalTitle;
        $scope.selectFile = this._selectFile;
        $scope.clickSelectFile = this._clickSelectFile;

        $scope.clickDismissModal = this._clickDismissModal;
        $scope.clickAddEditSticker = this._clickAddEditSticker;
    }

    //#endregion

    //#region Methods

    public $onInit(): void {
        this.$uibModalInstance
            .rendered
            .then(() => {
                const imageControl = document.getElementById(this.$scope.imageControlId);
                this.$scope.imageCropper = new Cropper(imageControl, {
                    aspectRatio: 640 / 480,
                    viewMode: 1
                });

                if (this.$scope.selectedImageUrl) {
                    this.$scope.imageCropper.replace(this.$scope.selectedImageUrl);
                }
            });
    };

    protected _loadModalTitle = (): string => {

        const initialModel = this.$scope.initialModel;
        if (!initialModel || !initialModel.id) {
            return this.$translate.instant('TITLE_ADD_STICKER');
        }

        return this.$translate.instant('TITLE_EDIT_STICKER', initialModel);
    };

    protected _selectFile = (control: HTMLInputElement): void => {
        if (!control) {
            return;
        }

        const files = control.files;
        if (!files || !files.length) {
            return;
        }

        // Get the first file.
        const image = files[0];
        control.value = null;

        this._loadFileDataUrlAsync(image)
            .then(dataUrl => {
                this.$scope.selectedImageUrl = dataUrl;
                this.$scope.imageCropper.replace(dataUrl);
            });
    };

    protected _clickSelectFile = (): void => {
        const control = document.getElementById(this.$scope.filePickerControlId);
        if (!control) {
            return;
        }

        control.click();
    };

    protected _clickDismissModal = (): void => {
        this.$uibModalInstance.dismiss();
    };

    protected _clickAddEditSticker = (): void => {
        const initialModel = this.$scope.initialModel;

        // Crop the image.
        this.$scope.imageCropper.setDragMode('crop');

        this
            .$q(resolve => {
                this.$scope.imageCropper
                    .getCroppedCanvas()
                    .toBlob(blob => {
                        resolve(blob);
                    });
            })
            .then((blob: Blob) => {
                if (initialModel && initialModel.id) {
                    const editStickerModel = new EditStickerViewModel();
                    editStickerModel.stickerId = this.$scope.initialModel.id;
                    editStickerModel.name = new EditableFieldViewModel<string>(this.$scope.name.value, true);
                    editStickerModel.photo = new EditableFieldViewModel<Blob>(blob, this.$scope.photo.hasModified);

                    this.$uibModalInstance
                        .close(editStickerModel);
                } else {
                    const addStickerModel = new AddStickerViewModel();
                    addStickerModel.name = this.$scope.name.value;
                    addStickerModel.photo = blob;

                    this.$uibModalInstance
                        .close(addStickerModel);
                }
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
    };


    //#endregion
}