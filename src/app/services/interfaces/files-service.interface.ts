import {IPromise} from "angular";

export interface IFilesService {

    blobToDataUrlAsync(blob: Blob | File): IPromise<string>;

}
