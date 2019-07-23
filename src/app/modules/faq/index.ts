import {StateProvider} from "@uirouter/angularjs";
import {UrlStatesConstant} from "../../constants/url-states.constant";
import {ICompileService, IQService, module} from 'angular';
import {ILazyLoad} from "oclazyload";
import {ControllerNamesConstant} from "../../constants/controller-names.constant";

/* @ngInject */
export class FaqModule {

    //#region Constructors

    public constructor(private $stateProvider: StateProvider) {

        $stateProvider
            .state(UrlStatesConstant.faqMasterPageModuleName, {
                url: UrlStatesConstant.faqMasterPageModuleUrl,
                controller: ControllerNamesConstant.faqMasterPageControllerName,
                templateProvider: ['$q', ($q: IQService) => {
                    // We have to inject $q service manually due to some reasons that ng-annotate cannot add $q service in production mode.
                    return $q((resolve) => {
                        // lazy load the view
                        require.ensure([], () => resolve(require('./master-page/faq-master-page.html')));
                    });
                }],
                parent: UrlStatesConstant.authenticatedLayoutModuleName,
                resolve: {
                    /*
                    * Load FAQ detail controller asynchronously.
                    * */
                    loadFaqMasterPageController:  ['$q', '$ocLazyLoad', ($q: IQService, $ocLazyLoad: ILazyLoad) => {

                        return $q((resolve) => {
                            require.ensure([], (require) => {

                                // Import angular-sanitize & textAngular module.
                                require('tinymce/tinymce');
                                require('tinymce/themes/silver');
                                require('angular-ui-tinymce/dist/tinymce.min');
                                require('tinymce/skins/ui/oxide/skin.css');

                                // load only controller module
                                let ngModule = module('app.faq-master-page', ['ui.tinymce']);
                                const {FaqMasterPageController} = require('./master-page/faq-master-page.controller.ts');

                                // // Lazy load faq detail.
                                const {FaqDetailDirective} = require('./faq-detail');
                                const {FaqDetailController} = require('./faq-detail/faq-detail.controller');
                                ngModule = ngModule.directive('faqDetail',
                                    ($q: IQService, $compile: ICompileService) => new FaqDetailDirective($q, $compile));

                                // Import controller file.
                                ngModule.controller(ControllerNamesConstant.faqMasterPageControllerName, FaqMasterPageController);
                                ngModule.controller(ControllerNamesConstant.faqDetailControllerName, FaqDetailController);
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
