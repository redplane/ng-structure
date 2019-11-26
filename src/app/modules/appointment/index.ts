import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../constants/url-states.constant";
import {IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {ControllerNamesConstant} from "../../constants/controller-names.constant";

/* @ngInject */
export class AppointmentModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        $stateProvider
            .state(UrlStatesConstant.appointmentManagementModuleName, {
                url: UrlStatesConstant.appointmentManagementModuleUrl,
                controller: ControllerNamesConstant.appointmentManagementControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./appointment-management.html')));
                    });
                }],
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                resolve: {
                    /*
                    * Load FAQ detail controller asynchronously.
                    * */
                    loadController: ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {

                        return $q((resolve) => {
                            require.ensure([], (require) => {

                                require('../shared/message-modal');

                                // load only controller module
                                let ngModule = module('app.appointment', ['ngMessageModalModule']);
                                const {AppointmentManagementController} = require('./appointment-management.controller');

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.appointmentManagementControllerName, AppointmentManagementController);
                                $ocLazyLoad.inject(ngModule.name);
                                resolve(ngModule.controller);
                            })
                        });
                    }]
                }
            });

    }

    //#endregion
}
