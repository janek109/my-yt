'use strict';

/* Controllers */

var myservice = "http://myyt.v.l/";

var controlers = angular.module('myApp.controllers', []);

controlers.controller('ListOfFilms', ['$scope', '$http', 'socket',
    function($scope, $http, socket) {
        socket.on('onChangedFilms', function(data) {
            $http.get(myservice+'index/list').success(function(data) {
                $scope.films = data;
            });
        });

        $http.get(myservice+'index/list').success(function(data) {
            $scope.films = data;
        });

        $scope.orderProp = 'name';

        $scope.deleteFilm = function(id) {
            $http.get(myservice+'index/delete?id='+ id).success(function(data) {
                $scope.status = data.status;
                $http.get(myservice+'index/list').success(function(data) {
                    $scope.films = data;
                    socket.emit('ChangedFilms', data);
                });
            });
        };
    }]);

controlers.controller('Film', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get(myservice+'index/show/?id=' + $routeParams.id).success(function(data) {
            $scope.film = data;
            $scope.code = data.yt_id;
        });
    }]);

controlers.controller('AddFilm', ['$scope', '$routeParams', '$http', '$location', 'socket',
    function($scope, $routeParams, $http, $location, socket) {
        $scope.addFilm = function(film) {
            if(angular.isUndefined(film)
                || angular.isUndefined(film.name)
                || angular.isUndefined(film.yt_id)
                || angular.isUndefined(film.publish)
                || angular.isUndefined(film.description))
            {
                $scope.status = "film not added";
            }
            else
            {
                $http.get(myservice+'index/add?name=' + film.name + '&yt_id= ' + film.yt_id + ' &publish=' + film.publish + '&description=' + film.description).success(function(data) {
                    if (data.status == 'ok')
                    {
                        socket.emit('ChangedFilms', film);
                        $location.path("/listoffilms");
                    }
                    else
                    {
                        $scope.status = "film not added";
                    }
                });
            }

        }
    }]);

controlers.controller('EditFilm', ['$scope', '$routeParams', '$http', '$location', 'socket',
    function($scope, $routeParams, $http, $location, socket) {
        $http.get(myservice+'index/show/?id=' + $routeParams.id).success(function(data) {
            $scope.film = data;
        });

        $scope.editFilm = function(film) {
            if(angular.isUndefined(film)
                || angular.isUndefined(film.id)
                || angular.isUndefined(film.name)
                || angular.isUndefined(film.yt_id)
                || angular.isUndefined(film.publish)
                || angular.isUndefined(film.description))
            {
                $scope.status = "film not edited";
            }
            else
            {
                $http.get(myservice+'index/edit?id=' + film.id + '&name=' + film.name + '&yt_id= ' + film.yt_id + ' &publish=' + film.publish + '&description=' + film.description).success(function(data) {
                    if (data.status == 'ok')
                    {
                        console.log(socket);
                        socket.emit('ChangedFilms', film);
                        $location.path("/listoffilms");
                    }
                    else
                    {
                        $scope.status = "film not edited";
                    }
                });
            }
        }
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