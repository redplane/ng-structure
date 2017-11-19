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

// Import jquery lib.
require('jquery');
require('bootstrap');
require('admin-lte');

// Angular plugins declaration.
var angular = require('angular');
require('@uirouter/angularjs');
require('angular-block-ui');
require('angular-toastr');

// Module declaration.
var ngModule = angular.module('ngApp', ['ui.router', 'blockUI', 'toastr']);
ngModule.config(function($urlRouterProvider, urlStates){
    $urlRouterProvider.otherwise(urlStates.dashboard.url);
});

// Constants import.
require('./constants/index')(ngModule);

// Directive requirements.
require('./directives/index')(ngModule);

// Module requirements.
require('./modules/index')(ngModule);