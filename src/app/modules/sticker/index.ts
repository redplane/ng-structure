import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../constants/url-states.constant";
import {ICompileService, IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {ControllerNamesConstant} from "../../constants/controller-names.constant";

/* @ngInject */
export class StickerModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        $stateProvider
            .state(UrlStatesConstant.stickerManagementModuleName, {
                url: UrlStatesConstant.stickerManagementModuleUrl,
                controller: ControllerNamesConstant.stickerManagementControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        require('cropperjs/dist/cropper.css');
                        // lazy load the view
                        require.ensure([], () => resolve(require('./sticker-management.html')));
                    });
                }],
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                resolve: {
                    /*
                    * Load FAQ detail controller asynchronously.
                    * */
                    loadController:  ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {

                        return $q((resolve) => {
                            require.ensure([], (require) => {

                                const {DetailedStickerModalService} = require('./detailed-sticker-modal/detailed-sticker-modal.service');

                                require('../shared/message-modal');

                                // load only controller module
                                let ngModule = module('app.sticker', ['ngMessageModalModule']);
                                ngModule = ngModule.service('$detailedStickerModals', DetailedStickerModalService);
                                const {StickerManagementController} = require('./sticker-management.controller');

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.stickerManagementControllerName, StickerManagementController);
                                $ocLazyLoad.inject( ngModule.name);
                                resolve(ngModule.controller);
                            })
                        });
                    }]
                }
            });

    }

    //#endregion
}
