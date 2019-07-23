// Babel polyfill for browser compatibility.
import '@babel/polyfill';

// Import css file.
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/ui-bootstrap4/dist/ui-bootstrap-csp.css';
import '../../node_modules/font-awesome/scss/font-awesome.scss';

import './styles/style.scss';

import {UrlStatesConstant} from './constants/url-states.constant';
import {map} from "rxjs/operators";

// Import bootstrap module.
import '../../node_modules/jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';
import 'popper.js';


import {ajax, AjaxResponse} from "rxjs/ajax";
import {UrlRulesApi} from "@uirouter/angularjs";
import {module, bootstrap, IHttpProvider} from 'angular';
import {IAppSettings} from "./interfaces/app-setting.interface";

import 'angular-localforage';
// App name which will be resolved by webpack ProvidePlugin.
declare var APP_NAME: string;

export class AppModule {

    //#region Constructor

    //#endregion

    //#region Methods

    // Load angular app option asynchronously.
    // noinspection TypeScriptUnresolvedFunction
    protected loadAngularAppOptionsAsync = (): Promise<IAppSettings> => {
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

        return <Promise<IAppSettings>>ajaxRequestSource
            .pipe(map((ajaxResponse: AjaxResponse) => {
                return <IAppSettings>ajaxResponse.response;
            }))
            .toPromise();
    };

    // Bootstrap angular app.
    public loadAngularApp = (): Promise<void> => {

        // App settings that have been loaded from external configuration file.
        let appSettings: IAppSettings = {};

        // Load app options first.
        const loadAppOptionsPromise = this.loadAngularAppOptionsAsync();
        return loadAppOptionsPromise
            .then((options: IAppSettings) => {
                appSettings = options;

                const loadLibraryPromises = [];

                loadLibraryPromises.push(import('oclazyload/dist/ocLazyLoad.js'));
                loadLibraryPromises.push(import('@uirouter/angularjs'));
                loadLibraryPromises.push(import('angular-translate'));
                loadLibraryPromises.push(import('angular-translate-loader-static-files'));
                loadLibraryPromises.push(import('angular-sanitize'));
                loadLibraryPromises.push(import('angular-sanitize'));
                loadLibraryPromises.push(import('ui-bootstrap4/dist/ui-bootstrap-tpls'));
                loadLibraryPromises.push(import('angular-moment'));

                return Promise
                    .all(loadLibraryPromises);

            })
            .then(() => {
                // Module declaration.
                let ngModule = module(APP_NAME, [
                    'ui.router', 'pascalprecht.translate',
                    'oc.lazyLoad', 'ngSanitize', 'LocalForageModule', 'ui.bootstrap', 'angularMoment']);

                // Register app settings that have been loaded from external configuration file.
                ngModule.constant('appSettings', appSettings);

                ngModule
                    .config(($urlRouterProvider: UrlRulesApi, $httpProvider: IHttpProvider) => {
                    // API interceptor
                    $httpProvider.interceptors.push('apiInterceptor');

                    // Url router config.
                    $urlRouterProvider.otherwise(($injector) => {
                        const $state = $injector.get('$state');
                        $state.go(UrlStatesConstant.faqMasterPageModuleName);
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
