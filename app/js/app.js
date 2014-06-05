'use strict';

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'btford.socket-io',
  'ngRoute',
  'ngCookies',
  'myAppAnimations',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]);

myApp.factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
        test : function () {
            return 1;
        },
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    }});

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