// Library import.
import * as path from 'path';

export class BaseOption {

    //#region Properties

    /*
    * Whether the source code is stored.
    * */
    private readonly _sourceCodeFolder = 'src';

    /*
    * Whether the distributed package files are stored.
    * */
    private readonly _distributedFolder = `${this._sourceCodeFolder}/dist`;

    /*
    * Whether the min app source code files are stored.
    * */
    private readonly _appFolder = `${this._sourceCodeFolder}/app`;

    /*
    * Root folder.
    * */
    private readonly _rootFolder: string = '';

    //#endregion

    //#region Constructor

    public constructor(root: string) {
        this._rootFolder = root;
    }

    //#endregion

    //#region Methods

    /*
    * Load source code full path.
    * */
    public loadSourceCodeFullPath(): string {
        return  path.resolve(this._rootFolder, this._sourceCodeFolder);
    }

    /*
    * Load app full path.
    * */
    public loadAppFullPath(): string {
        return path.resolve(this._rootFolder, this._appFolder);
    }

    /*
    * Load the folder full path in which distributed files are stored.
    * */
    public loadDistributedFolderPath(): string {
        return path.resolve(this._rootFolder, this._distributedFolder);
    }

    //#endregion
}



