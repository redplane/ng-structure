'use strict';

// Css imports.
require('../../node_modules/bootstrap/dist/css/bootstrap.css');

// Import jquery lib.
require('jquery');

// Angular plugins declaration.
require('angular-route');
require('@uirouter/angularjs');

// Module init.
let angular = require('angular');

// Module declaration.
let ngModule = angular.module('ngApp', ['ngRoute', 'ui.router']);
ngModule.config(function($urlRouterProvider){
    $urlRouterProvider.when('', '/login');
});

// Constants import.
require('./constants/index')(ngModule);

// Directive requirements.
require('./directives/index')(ngModule);

// Module requirements.
require('./modules/account/index')(ngModule);
require('./modules/dashboard/index')(ngModule);