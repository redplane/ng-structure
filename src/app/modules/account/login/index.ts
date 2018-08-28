import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {module} from 'angular';


export class LoginModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {
        $stateProvider
            .state(UrlStatesConstant.loginModuleName, {
                url: UrlStatesConstant.loginModuleUrl,
                controller: 'loginController',
                templateProvider: ['$q', ($q) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./login.html')));
                    });
                }],
                parent: UrlStatesConstant.authorizeLayoutModuleName,
                resolve: {
                    /*
                    * Load login controller.
                    * */
                    loadLoginController:  ['$q', '$ocLazyLoad', ($q, $ocLazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], (require) => {
                                // load only controller module
                                let ngModule = module('account.login', []);
                                const {LoginController} = require('./login.controller.ts');
                                // Import controller file.
                                ngModule.controller('loginController', LoginController);
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