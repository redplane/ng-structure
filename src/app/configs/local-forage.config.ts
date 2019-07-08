import {IModule} from "angular";
declare var APP_NAME: string;

export class LocalForageConfig {

    //#region Constructor

    public constructor(ngModule: IModule) {
        ngModule.config(['$localForageProvider', function ($localForageProvider) {
            $localForageProvider.config({
                driver: 'localStorageWrapper', // if you want to force a driver
                name: APP_NAME, // name of the database and prefix for your data, it is "lf" by default
                version: 1.0, // version of the database, you shouldn't have to use this
                storeName: 'keyvaluepairs', // name of the table
                description: 'some description'
            });
        }]);
    }

    //#endregion
}
