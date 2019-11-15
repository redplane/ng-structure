import {StateProvider} from "@uirouter/angularjs";
import {IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {UrlStatesConstant} from "../../../../constants/url-states.constant";
import {ControllerNamesConstant} from "../../../../constants/controller-names.constant";
import {IUserService} from "../../../../services/interfaces/user-service.interface";
import {DetailedUserStateParams} from "../../../../models/route-params/detailed-user-state-params";

/* @ngInject */
export class UserDetailModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {
        $stateProvider
            .state(UrlStatesConstant.detailedVendorModuleName, {
                url: UrlStatesConstant.detailedVendorModuleUrl,
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                views: {
                    '': {
                        templateProvider: ['$q', ($q: IQService) => {
                            // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                            return $q((resolve) => {
                                // lazy load the view
                                require.ensure([], () => {
                                    resolve(require('./user-detail.html'));
                                });
                            });
                        }],
                        controller: ControllerNamesConstant.userDetailControllerName
                    },
                    'detailedVendor@': {
                        templateProvider: ['$q', ($q: IQService) => {
                            // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                            return $q((resolve) => {
                                // lazy load the view
                                require.ensure([], () => {
                                    resolve(require('./detailed-vendor/detailed-vendor.html'));
                                });
                            });
                        }]
                    }
                },
                resolve: {
                    loadDetailedVendorController: ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], (require) => {
                                // load only controller module
                                let ngModule = module('user.user-detail.detailed-vendor', []);

                                // Lazy load login controller
                                const {DetailedVendorController} = require('./detailed-vendor/detailed-vendor.controller');

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.detailedVendorControllerName, DetailedVendorController);
                                $ocLazyLoad.inject(ngModule.name);
                                resolve(ngModule.controller);
                            });
                        });
                    }],

                    /*
                    * Load login controller.
                    * */
                    loadDetailedUserController: ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], (require) => {
                                // load only controller module
                                let ngModule = module('user.user-detail.detailed-vendor', []);

                                // Lazy load login controller
                                const {UserDetailController} = require('./user-detail.controller');

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.userDetailControllerName, UserDetailController);
                                $ocLazyLoad.inject(ngModule.name);
                                resolve(ngModule.controller);
                            });
                        });
                    }],

                    detailedUser: ['$users', '$stateParams', ($users: IUserService, $stateParams: DetailedUserStateParams) => {
                        return $users.loadDetailedUserAsync($stateParams.id);
                    }]
                }
            });

        $stateProvider
            .state(UrlStatesConstant.userDetailModuleName, {
                url: UrlStatesConstant.userDetailModuleUrl,
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                controller: ControllerNamesConstant.userDetailControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => {
                            resolve(require('./user-detail.html'));
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
                                let ngModule = module('user.user-detail', []);

                                // Lazy load login controller
                                const {UserDetailController} = require('./user-detail.controller');

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.userDetailControllerName, UserDetailController);
                                $ocLazyLoad.inject(ngModule.name);
                                resolve(ngModule.controller);
                            });
                        });
                    }],

                    detailedUser: ['$users', '$stateParams', ($users: IUserService, $stateParams: DetailedUserStateParams) => {
                        return $users.loadDetailedUserAsync($stateParams.id);
                    }]
                }
            });
    }

    //#endregion
}
