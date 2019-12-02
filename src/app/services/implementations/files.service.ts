import {IFilesService} from "../interfaces/files-service.interface";
import {IPromise, IQService} from "angular";

export class FilesService implements IFilesService {

    //#region Constructor

    public constructor(protected $q: IQService) {}

    //#endregion

    //#region Methods

    public blobToDataUrlAsync(blob: Blob | File): IPromise<string> {
        const fileReader = new FileReader();
        const loadFileContentPromise: IPromise<string> = this
            .$q(resolve => {
                fileReader.onload = () => {
                    const content = <string> fileReader.result;
                    resolve(content);
                };
            });

        fileReader.readAsDataURL(blob);
        return loadFileContentPromise;
    }

    //#endregion

}
