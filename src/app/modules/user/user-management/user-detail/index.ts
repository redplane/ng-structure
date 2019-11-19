import {Ng1ViewDeclaration, StateProvider} from "@uirouter/angularjs";
import {IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {UrlStatesConstant} from "../../../../constants/url-states.constant";
import {ControllerNamesConstant} from "../../../../constants/controller-names.constant";
import {IUsersService} from "../../../../services/interfaces/user-service.interface";
import {DetailedUserStateParams} from "../../../../models/route-params/detailed-user-state-params";
import {DetailedUserViewConstant} from "../../../../constants/detailed-user-view.constant";
import {DetailedUserViewModel} from "../../../../view-models/user/detailed-user.view-model";
import {UserRoles} from "../../../../enums/user-roles.enum";

/* @ngInject */
export class UserDetailModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        // View definitions.
        const detailedVendorView = `${DetailedUserViewConstant.detailedFoodVendor}@${UrlStatesConstant.detailedVendorModuleName}`;
        const assignedLocationView = `${DetailedUserViewConstant.assignedLocations}@${UrlStatesConstant.vendorAssignedLocationModuleName}`;

        const detailedVendorViews: { [key: string]: string | Ng1ViewDeclaration } = {};
        const assignedLocationViews: { [key: string]: string | Ng1ViewDeclaration } = {};

        // Default view.
        detailedVendorViews[''] = {
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
        };

        // Detailed vendor view.
        detailedVendorViews[detailedVendorView] = {
            templateProvider: ['$q', '$users', 'detailedUser', ($q: IQService,
                                                                $users: IUsersService,
                                                                detailedUser: DetailedUserViewModel) => {
                // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                return $q((resolve) => {
                    // lazy load the view
                    require.ensure([], () => {

                        if ($users.hasRoles(detailedUser.roles, [UserRoles.foodVendor])) {
                            resolve(require('./detailed-food-vendor/detailed-food-vendor.html'));
                            return;
                        }

                        return resolve(require('./detailed-food-delivery-vendor/detailed-food-delivery-vendor.html'))
                    });
                });
            }],
            controller: ControllerNamesConstant.detailedVendorControllerName
        };

        $stateProvider
            .state(UrlStatesConstant.detailedVendorModuleName, {
                url: UrlStatesConstant.detailedVendorModuleUrl,
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                views: detailedVendorViews,
                resolve: {
                    loadController: ['$q',
                        '$ocLazyLoad', '$users', 'detailedUser', (
                            $q: IQService,
                            $ocLazyLoad: ILazyLoad,
                            $users: IUsersService,
                            detailedUser: DetailedUserViewModel) => {
                            return $q((resolve) => {
                                require.ensure([], (require) => {
                                    // load only controller module
                                    let ngModule = module('user.user-detail.detailed-food-vendor', [require('ngmap')]);

                                    // Lazy load login controller

                                    const {UserDetailController} = require('./user-detail.controller');

                                    // Import controller file.
                                    if ($users.hasRoles(detailedUser.roles, [UserRoles.foodVendor])) {
                                        const {DetailedFoodVendorController} = require('./detailed-food-vendor/detailed-food-vendor.controller');
                                        ngModule.controller(ControllerNamesConstant.detailedVendorControllerName, DetailedFoodVendorController);
                                    } else if ($users.hasRoles(detailedUser.roles, [UserRoles.foodDeliveryVendor])) {
                                        const {DetailedFoodDeliveryVendorController} = require('./detailed-food-delivery-vendor/detailed-food-delivery-vendor.controller');
                                        ngModule.controller(ControllerNamesConstant.detailedVendorControllerName, DetailedFoodDeliveryVendorController);
                                    }

                                    ngModule.controller(ControllerNamesConstant.userDetailControllerName, UserDetailController);

                                    $ocLazyLoad.inject(ngModule.name);
                                    resolve(ngModule.controller);
                                });
                            });
                        }],

                    detailedUser: ['$users', '$stateParams', ($users: IUsersService, $stateParams: DetailedUserStateParams) => {
                        return $users.loadDetailedUserAsync($stateParams.id);
                    }]
                }
            });


        // User detailed view.
        assignedLocationViews[''] = {
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
        };

        // Detailed vendor view.
        assignedLocationViews[assignedLocationView] = {
            templateProvider: ['$q', ($q: IQService) => {
                // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                return $q((resolve) => {
                    // lazy load the view
                    require.ensure([], () => {
                        resolve(require('./vendor-assigned-location/vendor-assigned-location.html'));
                    });
                });
            }],
            controller: ControllerNamesConstant.vendorAssignedLocationControllerName
        };

        $stateProvider
            .state(UrlStatesConstant.vendorAssignedLocationModuleName, {
                url: UrlStatesConstant.vendorAssignedLocationModuleUrl,
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                views: assignedLocationViews,
                resolve: {
                    loadController: ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {
                        return $q((resolve) => {
                            require.ensure([], (require) => {
                                // load only controller module
                                let ngModule = module('user.user-detail.assigned-location', [require('ngmap')]);

                                // Lazy load login controller
                                const {UserDetailController} = require('./user-detail.controller');
                                const {VendorAssignedLocationController} = require('./vendor-assigned-location/vendor-assigned-location.controller');

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.userDetailControllerName, UserDetailController);
                                ngModule.controller(ControllerNamesConstant.vendorAssignedLocationControllerName, VendorAssignedLocationController);

                                $ocLazyLoad.inject(ngModule.name);
                                resolve(ngModule.controller);
                            });
                        });
                    }],

                    detailedUser: ['$users', '$stateParams', ($users: IUsersService, $stateParams: DetailedUserStateParams) => {
                        return $users.loadDetailedUserAsync($stateParams.id);
                    }]
                }
            });

        $stateProvider
            .state(UrlStatesConstant.detailedUserModuleName, {
                url: UrlStatesConstant.detailedUserModuleUrl,
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

                    detailedUser: ['$users', '$stateParams', ($users: IUsersService, $stateParams: DetailedUserStateParams) => {
                        return $users.loadDetailedUserAsync($stateParams.id);
                    }]
                }
            });
    }

    //#endregion
}
