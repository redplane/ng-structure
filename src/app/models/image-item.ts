export class ImageItem {

    //#region Properties

    public preview: string;

    public blob: Blob | null;

    //#endregion

    //#region Constructor

    public constructor(preview: string, blob: Blob) {
        this.preview = preview;
        this.blob = blob;
    }

    //#endregion

}
