import {IFormController, IScope} from "angular";
import {StickerViewModel} from "../../../view-models/stickers/sticker.view-model";
import Cropper from 'cropperjs/dist/cropper.esm.js';
import {KeyValueModel} from "../../../models/key-value.model";
import {EditableFieldViewModel} from "../../../view-models/editable-field.view-model";

export interface IDetailedStickerModalScope extends IScope, ng.ui.bootstrap.IModalScope {

    //#region Properties

    // Name of sticker.
    name: EditableFieldViewModel<string>;

    photo: EditableFieldViewModel<Blob>;

    initialModel: StickerViewModel;

    imageControlId: string;

    filePickerControlId: string;

    selectedImageUrl: string;

    imageCropper: Cropper;

    detailedStickerForm: IFormController;

    availableTrueFalseSelections: KeyValueModel<boolean>[];

    //#endregion

    //#region Methods

    loadModalTitle(): string;

    selectFile(control: HTMLInputElement): void;

    clickSelectFile(): void;

    clickDismissModal(): void;

    clickAddEditSticker(): void;

    //#endregion
}