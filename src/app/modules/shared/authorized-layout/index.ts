import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {module} from 'angular';


export class AuthorizedLayoutModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {
        $stateProvider
            .state(UrlStatesConstant.authorizeLayoutModuleName, {
                abstract: true,
                controller: 'authorizedLayoutController',
                templateProvider: ['$q', ($q) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./authorized-layout.html')));
                    });
                }],
                parent: UrlStatesConstant.unauthorizedLayoutModuleName,
                resolve: {
                    /*
                    * Load login controller.
                    * */
                    loadLoginController: ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], (require) => {
                                // load only controller module
                                let ngModule = module('shared.authorized-layout', []);
                                const {AuthorizedLayoutController} = require('./authorized-layout.controller.ts');
                                // Import controller file.
                                ngModule.controller('authorizedLayoutController', AuthorizedLayoutController);
                                $ocLazyLoad.load({name: ngModule.name});
                                resolve(ngModule.controller);
                            })
                        });
                    }]
                }
            });

    }

    //#endregion
}