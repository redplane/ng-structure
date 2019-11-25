import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../constants/url-states.constant";
import {ICompileService, IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {ControllerNamesConstant} from "../../constants/controller-names.constant";
import {DetailedPhraseModalService} from "./detailed-phrase-modal/detailed-phrase-modal.service";

/* @ngInject */
export class PhraseModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        $stateProvider
            .state(UrlStatesConstant.phraseManagementModuleName, {
                url: UrlStatesConstant.phraseManagementModuleUrl,
                controller: ControllerNamesConstant.phraseManagementControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./phrase-management.html')));
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

                                require('../shared/message-modal');

                                // load only controller module
                                let ngModule = module('app.phrase', ['ngMessageModalModule']);
                                ngModule = ngModule.service('$detailedPhraseModals', DetailedPhraseModalService);
                                const {PhraseManagementController} = require('./phrase-management.controller');

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.phraseManagementControllerName, PhraseManagementController);
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
