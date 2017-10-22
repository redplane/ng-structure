webpackJsonp([0],{

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var angular = __webpack_require__(19);
__webpack_require__(27);
__webpack_require__(28);

// Module declaration.
var ngModule = angular.module('ngApp', ['ngRoute', 'ui.router']);

// Directive requirements.
__webpack_require__(79)(ngModule);

// Module requirements.
__webpack_require__(81)(ngModule);
__webpack_require__(83)(ngModule);

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(ngModule){
    __webpack_require__(80)(ngModule);
};

/***/ }),

/***/ 80:
/***/ (function(module, exports) {

module.exports = function(ngModule){

    /*
    * Directive declaration.
    * */
    ngModule.directive('kcdHello', function(){
        return {
            templateUrl: '/directives/kcd-hello/kcd-hello.directive.html',
            restrict: 'E',
            scope: {},
            controller: function($scope){
                $scope.message = 'Hello world';
            }
        }
    });
};

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(82)(ngModule);

module.exports = function(ngModule){
    /*
    * Routes configuration.
    * */
    ngModule.config(function($stateProvider){
       $stateProvider.state('login', {
           url: '/login',
           templateUrl: '/modules/account/login/login.html',
           controller: 'loginController'
       })
    });
};


/***/ }),

/***/ 82:
/***/ (function(module, exports) {

module.exports = function(ngModule){
  ngModule.controller('loginController', function($scope){
    $scope.message = 'This is login controller';
  });
};

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(84);

module.exports = function(ngModule){
    ngModule.config(function($stateProvider){
       $stateProvider.state('main-dashboard', {
           url: '/dashboard/main',
           templateUrl: '/modules/dashboard/main/main.html',
           controller: 'homeController'
       });
    });
};

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

/*
* Module exports.
* */
module.exports = function(ngModule){
    ngModule.controller('mainDashboardController', function($scope){
        
    });
};

/***/ })

},[54]);