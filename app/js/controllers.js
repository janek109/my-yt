'use strict';

/* Controllers */

var controlers = angular.module('myApp.controllers', []);

controlers.controller('ListOfFilms', ['$scope', '$http',
    function($scope, $http) {
        $http.get('json/films.json').success(function(data) {
            $scope.films = data;
        });

        $scope.orderProp = 'name';
    }]);

controlers.controller('Film', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get('json/films/' + $routeParams.id + '.json').success(function(data) {
            $scope.film = data;
            $scope.code = data.yt_id;
        });

    }]);

controlers.directive('myYoutube', function($sce) {
    return {
        restrict: 'EA',
        scope: { code:'=' },
        replace: true,
        template: '<div style="height:400px;"><iframe style="overflow:hidden;height:390px;width:640px" width="640px" height="390px" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
        link: function (scope) {
            scope.$watch('code', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal + "?autoplay=0");
                }
            });
        }
    };
});