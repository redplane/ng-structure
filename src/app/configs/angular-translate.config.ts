import {IModule} from "angular";

export class AngularTranslateConfig {

    //#region Constructor

    public constructor(ngModule: IModule){
        ngModule.config(($translateProvider: angular.translate.ITranslateProvider) => {
            // Translation config.
            $translateProvider.useStaticFilesLoader({
                prefix: './assets/dictionary/',
                suffix: '.json'
            });

            // en-US is default selection.
            $translateProvider.use('en-US');
        });
    }

    //#endregion
}