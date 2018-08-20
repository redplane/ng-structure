'use strict';

// Css imports.
require('../../node_modules/bootstrap/dist/css/bootstrap.css');

// AdminLTE
require('../../node_modules/admin-lte/dist/css/AdminLTE.css');
require('../../node_modules/admin-lte/dist/css/skins/skin-black.css');

require('../../node_modules/angular-toastr/dist/angular-toastr.css');

// Font awesome.
require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/angular-block-ui/dist/angular-block-ui.css');

// Moment picker.
require('../../node_modules/angular-moment-picker/dist/angular-moment-picker.css');

// Import app style.
require('./app.scss');

// Import jquery lib.
require('jquery');
require('bootstrap');
require('admin-lte');
require('moment');
require('@uirouter/angularjs');

// Angular plugins declaration.
let angular = require('angular');
require('oclazyload');
require('@uirouter/angularjs');
require('angular-block-ui');
require('angular-toastr');
require('angular-translate');
require('angular-translate-loader-static-files');
require('angular-moment');
require('angular-moment-picker');
require('ng-data-annotation');
require('angular-sanitize');

$.ajax({
    url: '/assets/app-settings.json',
    contentType: 'application/json',
    method: 'GET',
    cache: false,
    crossDomain: false,
    success: (loadAppSettings) => {

        // Configuration will be save in window.<APP_NAME> object.
        window[APP_NAME] = loadAppSettings;

        // Module declaration.
        let ngModule = angular.module(APP_NAME, [
            'ui.router', 'blockUI', 'toastr', 'pascalprecht.translate',
            'oc.lazyLoad',
            'angularMoment', 'moment-picker', 'ngDataAnnotations', 'ngSanitize']);

        ngModule.config(($urlRouterProvider, $httpProvider, urlStatesConstant) => {
            // API interceptor
            $httpProvider.interceptors.push('apiInterceptor');

            // Url router config.
            $urlRouterProvider.otherwise(urlStatesConstant.dashboard.url);
        });

        // Import oc-lazy load.
        require('./configs')(ngModule);

        // Constants import.
        require('./constants/index')(ngModule);

        // Factories import.
        require('./factories/index')(ngModule);

        // Services import.
        require('./services/index')(ngModule);

        // Directive requirements.
        require('./directives/index')(ngModule);

        // Module requirements.
        require('./modules/index')(ngModule);

        // Manually bootstrap application.
        angular.bootstrap(document, [APP_NAME]);
    }
});

