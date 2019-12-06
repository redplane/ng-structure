import {StateProvider} from "@uirouter/angularjs";
import {ICompileService, IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {ControllerNamesConstant} from "../../../constants/controller-names.constant";
import {Ng1StateDeclaration} from "@uirouter/angularjs/lib/interface";
import {IMailTemplatesService} from "../../../services/interfaces/mail-templates-service.interface";
import {DetailedMailTemplateStateParams} from "../../../models/route-params/detailed-mail-template.state-params";

/* @ngInject */
export class DetailedMailTemplateModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        // Initialize state definition.
        const detailedMailTemplateStateDefinition: Ng1StateDeclaration = {
            controller: ControllerNamesConstant.detailedMailTemplateControllerName,
            templateProvider: ['$q', ($q: IQService) => {
                // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                return $q((resolve) => {
                    // lazy load the view
                    require.ensure([], () => resolve(require('./detailed-mail-template.html')));
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

                            require('../../shared/message-modal');

                            // load only controller module
                            let ngModule = module('app.detailed-mail-template', ['ngMessageModalModule']);
                            const {DetailedMailTemplateController} = require('./detailed-mail-template.controller');

                            // Import controller file.
                            ngModule.controller(ControllerNamesConstant.detailedMailTemplateControllerName,
                                DetailedMailTemplateController);

                            $ocLazyLoad.inject( ngModule.name);
                            resolve(ngModule.controller);
                        })
                    });
                }]
            }
        };

        const addMailTemplateStateDefinition = {...detailedMailTemplateStateDefinition};
        addMailTemplateStateDefinition.url = UrlStatesConstant.addMailTemplateModuleUrl;
        addMailTemplateStateDefinition.resolve['detailedMailTemplate'] = () => null;

        const editMailTemplateStateDefinition = {...detailedMailTemplateStateDefinition};
        editMailTemplateStateDefinition.url = UrlStatesConstant.editMailTemplateModuleUrl;
        editMailTemplateStateDefinition.resolve['detailedMailTemplate'] = [
            '$stateParams', '$mailTemplates',
            ($stateParams: DetailedMailTemplateStateParams,
             $mailTemplates: IMailTemplatesService) => {
            return $mailTemplates
                .loadMailTemplateByIdAsync($stateParams.id);
        }];

        // Add mail template.
        $stateProvider
            .state(UrlStatesConstant.addMailTemplateModuleName, addMailTemplateStateDefinition);

        // Edit mail template.
        $stateProvider
            .state(UrlStatesConstant.editMailTemplateModuleName, editMailTemplateStateDefinition);

    }

    //#endregion
}
