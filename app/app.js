'use strict';
// Css imports.
require('../node_modules/bootstrap/dist/css/bootstrap.css');

// Import jquery lib.
require('jquery');

// Angular plugins declaration.
require('angular-route');
require('@uirouter/angularjs');

// Module init.
var angular = require('angular');

// Module declaration.
var ngModule = angular.module('ngApp', ['ngRoute', 'ui.router']);

// Directive requirements.
require('./directives/index')(ngModule);

// Module requirements.
require('./modules/account')(ngModule);
require('./modules/dashboard')(ngModule);