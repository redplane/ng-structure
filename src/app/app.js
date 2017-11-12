'use strict';

// Css imports.
require('../../node_modules/bootstrap/dist/css/bootstrap.css');

// Import jquery lib.
require('jquery');

// Angular plugins declaration.
require('@uirouter/angularjs');

// Module init.
var angular = require('angular');

// Module declaration.
var ngModule = angular.module('ngApp', ['ui.router']);
ngModule.config(function($urlRouterProvider, appSettings){
    $urlRouterProvider.otherwise('login');
});

// Constants import.
require('./constants/index')(ngModule);

// Directive requirements.
require('./directives/index')(ngModule);

// Module requirements.
require('./modules/account/index')(ngModule);
require('./modules/dashboard/index')(ngModule);