import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";

/* @ngInject */
export class LoginModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {
        $stateProvider
            .state(UrlStatesConstant.loginModuleName, {
                url: UrlStatesConstant.loginModuleUrl,
                controller: 'loginController',
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {

                        // Load view style.
                        require('./login.scss');

                        // lazy load the view
                        require.ensure([], () => resolve(require('./login.html')));
                    });
                }],
                resolve: {
                    /*
                    * Load login controller.
                    * */
                    loadController: ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], (require) => {
                                // load only controller module
                                let ngModule = module('user.login', []);

                                // Lazy load login controller
                                const {LoginController} = require('./login.controller');

                                // Import controller file.
                                ngModule.controller('loginController', LoginController);
                                $ocLazyLoad.inject(ngModule.name);
                                resolve(ngModule.controller);
                            });
                        });
                    }]
                }
            });

    }

    //#endregion
}