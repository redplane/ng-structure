'use strict';
var angular = require('angular');
require('angular-route');
require('@uirouter/angularjs');

// Module declaration.
var ngModule = angular.module('ngApp', ['ngRoute', 'ui.router']);

// Directive requirements.
require('./directives/index')(ngModule);

// Module requirements.
require('./modules/account')(ngModule);
require('./modules/dashboard')(ngModule);