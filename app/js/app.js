'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myAppAnimations',
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
            when('/addfilm', {
                templateUrl: 'partials/addfilm.html',
                controller: 'AddFilm'
            }).
            when('/editfilm/:id', {
                templateUrl: 'partials/editfilm.html',
                controller: 'EditFilm'
            }).
            otherwise({
                redirectTo: '/listoffilms'
            });
    }]);