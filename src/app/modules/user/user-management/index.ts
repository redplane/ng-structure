import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {ControllerNamesConstant} from "../../../constants/controller-names.constant";

/* @ngInject */
export class UserManagementModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {
        $stateProvider
            .state(UrlStatesConstant.userManagementModuleName, {
                url: UrlStatesConstant.userManagementModuleUrl,
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                controller: ControllerNamesConstant.userManagementControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => {
                            require('./user-management.scss');
                            resolve(require('./user-management.html'));
                        });
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
                                let ngModule = module('user.user-management', []);

                                // Lazy load login controller
                                const {UserManagementController} = require('./user-management.controller');

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.userManagementControllerName, UserManagementController);
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
