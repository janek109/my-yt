'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]);

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/listoffilms', {
                templateUrl: 'partials/listoffilms.html',
                controller: 'ListOfFilms'
            }).
            when('/film/:id', {
                templateUrl: 'partials/film.html',
                controller: 'Film'
            }).
            otherwise({
                redirectTo: '/listoffilms'
            });
    }]);