// Babel polyfill for browser compatibility.
import '@babel/polyfill';

// Import css file.
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/admin-lte/dist/css/AdminLTE.css';
import '../../node_modules/admin-lte/dist/css/skins/skin-black-light.css'
import '../../node_modules/font-awesome/css/font-awesome.css';

import {UrlStatesConstant} from './constants/url-states.constant';
import {AppOptionsModel} from "./models/app-options.model";
import {map, window} from "rxjs/operators";

// Import bootstrap module.
import * as jquery from 'jquery';
window['jQuery'] = window['$'] = jquery;
import 'bootstrap/dist/js/bootstrap';
import 'admin-lte/dist/js/adminlte';
import {ajax, AjaxResponse} from "rxjs/ajax";
import {UrlRulesApi} from "@uirouter/angularjs";
import {module, bootstrap, IHttpProvider} from 'angular';


// App name which will be resolved by webpack ProvidePlugin.
declare var APP_NAME: string;

export class AppModule {

    //#region Constructor

    //#endregion

    //#region Methods

    // Load angular app option asynchronously.
    // noinspection TypeScriptUnresolvedFunction
    protected loadAngularAppOptionsAsync = (): Promise<AppOptionsModel> => {
        const ajaxRequestSource = ajax({
            url: '/assets/app-settings.json',
            responseType: 'json',
            method: 'GET',
            crossDomain: false,
            headers: {
                'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });

        return <Promise<AppOptionsModel>>ajaxRequestSource
            .pipe(map((ajaxResponse: AjaxResponse) => {
                return <AppOptionsModel>ajaxResponse.response;
            }))
            .toPromise();
    };

    // Bootstrap angular app.
    public loadAngularApp = (): Promise<void> => {

        // Load app options first.
        const loadAppOptionsPromise = this.loadAngularAppOptionsAsync();
        return loadAppOptionsPromise
            .then((options: AppOptionsModel) => {
                window[APP_NAME] = options;

                const pLoadLibraryPromises = [];
                pLoadLibraryPromises.push(import('oclazyload'));
                pLoadLibraryPromises.push(import('@uirouter/angularjs'));
                pLoadLibraryPromises.push(import('angular-block-ui'));
                pLoadLibraryPromises.push(import('angular-toastr'));
                pLoadLibraryPromises.push(import('angular-translate'));
                pLoadLibraryPromises.push(import('angular-translate-loader-static-files'));
                pLoadLibraryPromises.push(import('angular-sanitize'));

                return Promise
                    .all(pLoadLibraryPromises);

            })
            .then(() => {
                // Module declaration.
                let ngModule = module(APP_NAME, [
                    'ui.router', 'blockUI', 'toastr', 'pascalprecht.translate',
                    'oc.lazyLoad', 'ngSanitize']);

                ngModule.config(($urlRouterProvider: UrlRulesApi, $httpProvider: IHttpProvider) => {
                    // API interceptor
                    $httpProvider.interceptors.push('apiInterceptor');

                    // Url router config.
                    $urlRouterProvider.otherwise(($injector) => {
                        const $state = $injector.get('$state');
                        $state.go(UrlStatesConstant.dashboardModuleName);
                    });
                });

                // Module configurations.
                const {ConfigModule} = require('./configs');
                new ConfigModule(ngModule);

                // Factories import.
                const {FactoryModule} = require('./factories');
                new FactoryModule(ngModule);

                // Services import.
                const {ServiceModule} = require('./services');
                new ServiceModule(ngModule);

                const {PageModule} = require('./modules');
                new PageModule(ngModule);

                // Manually bootstrap application.
                bootstrap(document, [APP_NAME]);
            });
    };

    //#endregion
}

// Bootstrap the app when this file is loaded.
const appModule = new AppModule();
appModule.loadAngularApp();