import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {ICompileService, IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {IUsersService} from "../../../services/interfaces/user-service.interface";

/* @ngInject */
export class AuthenticatedLayoutModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        const authenticatedLayoutControllerName = 'unauthenticatedLayoutController';

        $stateProvider
            .state(UrlStatesConstant.authenticatedLayoutModuleName, {
                abstract: true,
                controller: authenticatedLayoutControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./authenticated-layout.html')));
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
                                let ngModule = module('shared.authenticated-layout', []);

                                // Lazy load navigation bar.
                                const {NavigationBarDirective} = require('../../../directives/navigation-bar');
                                ngModule = ngModule.directive('navigationBar',
                                    ($q: IQService, $compile: ICompileService) => new NavigationBarDirective($q, $compile));

                                // Lazy load sidebar.
                                const {SidebarDirective} = require('../../../directives/sidebar');
                                ngModule = ngModule.directive('sideBar',
                                    ($q: IQService, $compile: ICompileService) => new SidebarDirective($q, $compile));

                                const {AuthenticatedLayoutController} = require('./authenticated-layout.controller');

                                // Import controller file.
                                ngModule.controller(authenticatedLayoutControllerName, AuthenticatedLayoutController);
                                $ocLazyLoad.inject(ngModule.name);
                                resolve(ngModule.controller);
                            });
                        });
                    }],

                    profile: ['$users', ($users: IUsersService) => {
                        return $users.loadProfileAsync();
                    }]
                }
            });

    }

    //#endregion
}
