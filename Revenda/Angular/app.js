require('angular');
require('angular-route');
require('angular-animate');
require('angular-messages');
require('angular-resource');
require('angular-ui-bootstrap');
require('ngstorage');
require('ng-table');
require('sweetalert');

//Require Controllers
var LoginController = require('./Controllers/LoginController');
var RevendedorController = require('./Controllers/RevendedorController');
var ClienteController = require('./Controllers/ClienteController');

//Require Services
var RolesService = require('./Services/RolesService');
var RegisterService = require('./Services/RegisterService');
var VisitasService = require('./Services/VisitasService');


//Require Factory
var AuthService = require('./Factory/AuthService');
var AuthInterceptor = require('./Factory/AuthInterceptor');

var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngMessages', 'ngResource', 'ui.bootstrap', 'ngTable', 'ngStorage']);

//Controllers
app.controller('LoginController', LoginController);
app.controller('RevendedorController', RevendedorController);
app.controller('ClienteController', ClienteController);

//Factories
app.factory('AuthService', AuthService);
app.factory('AuthInterceptor', AuthInterceptor);

//Services
app.service('RolesService', RolesService);
app.service('RegisterService', RegisterService);
app.service('VisitasService', VisitasService);

app.run(['$location', '$localStorage', function ($location, $localStorage) {
    if (!$localStorage.userData)
        $location.path('/login');

    if ($localStorage.userData)
    {
        if (!$localStorage.userData.isAuthenticated)
            $location.path('/login');
    }
        
}]);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
        .when('/revendedor', {
            templateUrl: 'Angular/Pages/Revendedor/index.html',
            controller: 'RevendedorController as vm'
        })
        .when('/cliente', {
            templateUrl: 'Angular/Pages/Cliente/index.html',
            controller: 'ClienteController as vm'
        })
        .when('/login', {
            templateUrl: 'Angular/Pages/login.html',
            controller: 'LoginController as vm'
        })
        .otherwise({
            redirectTo: '/login'
        });

    

}]);


