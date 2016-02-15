/**
 * Created by apple on 02.03.15.
 */
angular.module('stub', [
    'ngRoute',
    'checklist-model',
    'ngTable',
    'ngResource',
    'ui.bootstrap',
    'angularFileUpload',
    'angular-loading-bar'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: './app/view/home.html',
            requireLogin: true,
            title: 'Home'
        }).when('/login', {
            templateUrl:'./app/view/login.html',
            controller: 'LoginController'
            ,title: 'Pagina Login'
        }).otherwise({
            redirectTo: '/login'
        });
    }])



    .constant('APPLICATION_SERVER', 'http://localhost:8080')
    /*.constant('APPLICATION_SERVER', 'http://0.0.0.0:8080')*/
    .constant('AUTH_TOKEN_HEADER', 'X-Authorization')
    .constant('AUTH_TOKEN', 'token')
    .constant('MIN_PERIOD_BETWEEN_APPLICATION', 94670856000)


    .run(['$rootScope', '$location','$route',  function ($rootScope, $location,$route) {
        return $rootScope.$on("$routeChangeStart", function (event,next) {
            $rootScope.title = next.$$route.title;
            if ((next.requireLogin && !window.localStorage.token)) {
                event.preventDefault();
                window.localStorage.clear();
                $location.path('/login');
            }
        });
    }])

    .config(['$httpProvider','cfpLoadingBarProvider', function ($httpProvider,cfpLoadingBarProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.interceptors.push('authInterceptor');
        cfpLoadingBarProvider.includeSpinner = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])

    .directive('timestamp', [function () {                                                                                                                                                                                       return{                                                                                                                                                                                                                     require: 'ngModel',                                                                                                                                                                                                     link: function (scope, elm, attrs, ngModel) {                                                                                                                                                                               ngModel.$parsers.push(function (viewValue) {                                                                                                                                                                                 var msecs = (viewValue) ? viewValue.getTime() : viewValue;
        if (isNaN(msecs)) {                                                                                                                                                                                                         ngModel.$setValidity('date', false);                                                                                                                                                                                     return undefined;                                                                                                                                                                                                   }else {                                                                                                                                                                                                                     ngModel.$setValidity('date', true);                                                                                                                                                                                     return msecs;                                                                                                                                                                                                       }                                                                                                                                                                                                                   });
        ngModel.$formatters.unshift(function (modelValue) {                                                                                                                                                                         var date = modelValue ? new Date(parseInt(modelValue, 10)) : undefined;                                                                                                                                                 return date;                                                                                                                                                                                                         });                                                                                                                                                                                                                 }                                                                                                                                                                                                                   };
    }])


    .filter('offset', function() {
        return function(input, start) {
            start = parseInt(start, 10);
            return input.slice(start);
        };
    })

    .factory('Report',  ['$resource','APPLICATION_SERVER', function ($resource,APPLICATION_SERVER) {
        return $resource(APPLICATION_SERVER+'/backend/api/v1/reports/:action/:type/:id/',{action:'@action',typr:'@type',id:'@id'}, {
            getArray:{
                method:'GET', isArray:true
            },
            get:{
                method:'GET'
            }
        });
    }])

    .factory('authInterceptor', [
        '$q', '$window', 'AUTH_TOKEN', 'AUTH_TOKEN_HEADER', '$log', '$location',
        function ($q, $window, AUTH_TOKEN, AUTH_TOKEN_HEADER, $log, $location) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};

                    if ($window.localStorage[AUTH_TOKEN]) {
                        config.headers[AUTH_TOKEN_HEADER] = $window.localStorage[AUTH_TOKEN];
                    }
                    return config;
                },

                response: function (response) {
                    return response || $q.when(response);
                },

                responseError: function (rejection) {
                    switch (rejection.status) {
                        case 404:
                            //$log.debug(rejection.status + '  ' + rejection.statusText + ': ' + rejection.data);
                            //$location.path('/');
                            break;
                        case 403:
                            $window.localStorage.clear();
                            $location.path('/');
                            break;
                        default:
                            $log.debug(rejection.status + '  ' + rejection.statusText + ': ' + rejection.data);
                    }
                    return $q.reject(rejection);
                }
            };
        }])

    .factory('userService', ['$window', '$http', '$q', 'AUTH_TOKEN', 'APPLICATION_SERVER',function ($window, $http, $q, AUTH_TOKEN, APPLICATION_SERVER) {

        var login = function (credentials) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: APPLICATION_SERVER + '/backend/api/v1/auth/login',
                data: credentials
            }).success(function (response) {
                $window.localStorage.username = response.username;
                $window.localStorage.raion    = response.raion;
                $window.localStorage.localitate = response.localitate;
                $window.localStorage.usertype = response.usertype;
                $window.localStorage[AUTH_TOKEN] = response.token;
                deferred.resolve();
                correct = true;
            }).error(function () {
                correct = false;
                deferred.reject();
            });
            return deferred.promise;
        };

        var logout = function logout() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: APPLICATION_SERVER + '/backend/api/v1/auth/logout/'+$window.localStorage.username
            }).success(function () {
                $window.localStorage.clear();
                deferred.resolve();
            }).error(function () {
                console.log("Error Logout");
                deferred.reject();
            });
            return deferred.promise;
        };

        var isAuthenticated = function () {
            return !!$window.localStorage[AUTH_TOKEN];
        };
        return {
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated
        };
    }])

    .controller('HomeController', ['$scope', '$location', 'userService', '$window',function ($scope, $location, userService, $window){
        $scope.obj = {
            raion:$window.localStorage.raion,
            usertype:$window.localStorage.usertype,
            localitate:$window.localStorage.localitate
        };
    }])

    .controller('LoginController', ['$scope', '$location', 'userService', '$window',function ($scope, $location, userService, $window) {
        $scope.isAuthenticated = userService.isAuthenticated();
        if (userService.isAuthenticated()) {

            if($location.path() === '/login')
                $location.path('/home');
            else
                $location.path($location.path());
        }

        if (!userService.isAuthenticated()) {
            $location.path('/login');

        }

        $scope.credentials = {
            username: $window.localStorage.username || '',
            password: ''
        };
        $scope.invalid = false;
        $scope.login = function () {
            console.log($scope.credentials);
            userService.login($scope.credentials).then(function () {
                $location.path('/home');
                $window.location.reload();
            }, function () {
                $scope.invalid = true;
            });
        };

        $scope.logout = function () {
            userService.logout().then(function () {
                $location.path('/login');
                $window.localStorage.clear();
                $window.location.reload();
            }, function () {
                $scope.invalid = true;
            });

        };
    }
    ])
    .controller('Datepicker', ['$scope', function ($scope) {
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
            $event.showWeeks = false;
        };
        $scope.dateOptions = {
            showWeeks:'false'
        };

        $scope.format = 'dd.MM.yyyy';
        $scope.YearFormat = 'yyyy';

    }]);
