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
        }).when('/cerere', {
            templateUrl: './app/view/add-application.html',
            controller:'NewApplicationController',
            requireLogin: true,
            title: 'Inregistrarea cererilor'
        }).when('/cerere/:id', {
            templateUrl: './app/view/add-application.html',
            controller:'NewApplicationController',
            requireLogin: true,
            title: 'Vizualizarea cererilor'
        }).when('/taxonomy/:descriminator/:desc', {
            templateUrl: './app/view/view-taxonomy.html',
            controller:'TaxonomyController',
            requireLogin: true,
            title: 'Inregistrarea cererilor'
        }).when('/mmpfs', {
            templateUrl: './app/view/repartizarea_mmpfs.html',
            controller:'RepartizareControllerMMPFS',
            requireLogin: true,
            title: 'Repartizarea stublor (MMPSF)'
        }).when('/dass', {
            templateUrl: './app/view/repartizarea_dass.html',
            controller:'RepartizareControllerDASS',
            requireLogin: true,
            title: 'Repartizarea stublor (DASS)'
        }).when('/registru', {
            templateUrl: './app/view/registru.html',
            controller:'RegistruController',
            requireLogin: true,
            title: 'Registru stub'
        }).when('/feed_back', {
            templateUrl: './app/view/feed_back.html',
            controller:'FeedBackController',
            requireLogin: true,
            title: 'Feed Back Prestator'
        }).when('/login', {
            templateUrl:'./app/view/login.html',
            controller: 'LoginController'
            ,title: 'Pagina Login'
        }).otherwise({
            redirectTo: '/login'
        });
    }])



    .constant('APPLICATION_SERVER', 'http://localhost:8080')
    /*.constant('APPLICATION_SERVER', 'http://192.168.2.173:8080')*/
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

    .directive('addMember', [function(){
        return{
            templateUrl: 'view/directives/addMember.html',
            //controller:'NewApplicationController',
            restrict: 'EA',
            scope: {
                memberType: '=type'
            }
        }
    }])

    .filter('offset', function() {
        return function(input, start) {
            start = parseInt(start, 10);
            return input.slice(start);
        };
    })

    .factory('MTIC', ['$resource','APPLICATION_SERVER', function($resource,APPLICATION_SERVER){
        return $resource(APPLICATION_SERVER+'/stub-backend/api/v1/external/mtic/:idnp',{idnp:'@idnp'}, {
            getArray:{
                method:'GET', isArray:true
            },
            get:{
                method:'GET'
            }
        });
    }])

    .factory('Document', ['$resource','APPLICATION_SERVER',  function ($resource,APPLICATION_SERVER) {
        return $resource(APPLICATION_SERVER+'/stub-backend/api/v1/documents/:application_id/:action/:file_name/:size', {application_id:'@application_id',action:'@action',file_name:'@file_name',size:'@size'},{
            update: {
                method: 'PUT', isArray:true
            },
            upload: {
                method: 'POST'
            },
            getArray:{
                method:'GET', isArray:true
            },
            get:{
                method:'GET'
            }
        });
    }])

    .factory('Application',  ['$resource','APPLICATION_SERVER',  function ($resource,APPLICATION_SERVER) {
        return $resource(APPLICATION_SERVER+'/stub-backend/api/v1/application/:action/:id/:raion/:specific/:year/:prestator/',{action:'@action',id:'@id',raion:'@raion', specific:'@specific',year:'@year',prestator:'@prestator'}, {
            update: {
                method: 'PUT', params:{action:'update',id:'@id'}
            },
            updateDocPresrnList: {
                method: 'PUT', params:{action:'update',id:'documentPresent',raion:'@id'}
            },
            getArray:{
                method:'GET', isArray:true
            },
            get:{
                method:'GET'
            }
        });
    }])

    .factory('Report',  ['$resource','APPLICATION_SERVER', function ($resource,APPLICATION_SERVER) {
        return $resource(APPLICATION_SERVER+'/stub-backend/api/v1/reports/:action/:type/:id/',{action:'@action',typr:'@type',id:'@id'}, {
            getArray:{
                method:'GET', isArray:true
            },
            get:{
                method:'GET'
            }
        });
    }])

    .factory('Taxonomy',  ['$resource','APPLICATION_SERVER',  function ($resource,APPLICATION_SERVER) {
        return $resource(APPLICATION_SERVER+'/stub-backend/api/v1/taxonomy/:descriminator/:desc/:id', {descriminator:'@descriminator',desc:'@desc',id:'@id'}, {
            getArray: {method:'GET', isArray:true},
            get: {method:'GET'}
        });
    }])

    .factory('Member',  ['$resource','APPLICATION_SERVER', function ($resource,APPLICATION_SERVER) {
        return $resource(APPLICATION_SERVER+'/stub-backend/api/v1/members/:cerere/:id',{cerere:'@cerere',id:'@id'}, {
                update: {
                    method: 'PUT'
                },
                get:{
                    method:'GET', isArray:true
                }
            }
        );
    }])

    .factory('Ticket' , ['$resource','APPLICATION_SERVER', function ($resource,APPLICATION_SERVER) {
        return $resource(APPLICATION_SERVER+'/stub-backend/api/v1/tickets/:action/:prestator/:raion/:year/:trimestr/:val',{action:'@action',prestator:'@prestator',raion:'@raion', year:'@year',trimestr:'@trimestr', val:'@val'}, {
            getNotArray: {method:'GET', params:{action:'prestator'}},
            get: {method:'GET',isArray:true},
            repartisation: {method:'POST', params:{action:'repartisation'}},
            update: {method:'PUT', params:{action:'update'},isArray:true}
        });
    }])

    .factory('Raions', ['Taxonomy', function (Taxonomy) {
        return   {raions : Taxonomy.getArray({descriminator: 'descriminator',desc: 'raion'})};
    }])

    .factory('Specificul', ['Taxonomy', function (Taxonomy) {
        return   {specific : Taxonomy.getArray({descriminator: 'descriminator',desc: 'specificul'})};
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
                url: APPLICATION_SERVER + '/stub-backend/api/v1/auth/login',
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
                url: APPLICATION_SERVER + '/stub-backend/api/v1/auth/logout/'+$window.localStorage.username
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

    }])

    .controller('RepartizareControllerMMPFS', ['$scope', 'FileUploader', '$window','$modal','$log','$q','$routeParams','$location','Taxonomy','Ticket','Raions','Application','APPLICATION_SERVER','cfpLoadingBar',
        function($scope, FileUploader, $window,$modal,$log,$q,$routeParams,$location,Taxonomy,Ticket,Raions,Application,APPLICATION_SERVER,cfpLoadingBar) {

            $scope.active = {
                prestator:true
            };

            $scope.itemsPerPage = 10;
            $scope.currentPage = 0;
            $scope.obj = {
                year:new Date().getTime()
            };

            /************** Upload File **************/
            var uploader = $scope.uploader = new FileUploader({
                scope: $scope
            });

            uploader.filters.push({
                name: 'customFilter',
                fn: function(item, options) {
                    console.log("Push item"+item);
                    return this.queue.length < 2;
                }
            });


            // CALLBACKS
            uploader.onWhenAddingFileFailed = function(item , filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function(fileItem) {
                console.info('onAfterAddingFile', fileItem);
                cfpLoadingBar.start();
            };
            uploader.onAfterAddingAll = function(addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
                $scope.loadTickets();

            };
            uploader.onBeforeUploadItem = function(item) {
                console.info('onBeforeUploadItem', item);
            };
            uploader.onProgressItem = function(fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            uploader.onProgressAll = function(progress) {
                console.info('onProgressAll', progress);
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };
            uploader.onCancelItem = function(fileItem, response, status, headers) {
                $scope.removeFile(fileItem);
                console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function(fileItem, response, status, headers) {
                console.info('onCompleteItem', fileItem, response, status, headers);
            };
            uploader.onCompleteAll = function() {
                console.info('onCompleteAll');
                $scope.getTicketsYearAndPrestator($scope.obj.year,$scope.obj.prestator);
                cfpLoadingBar.complete();
            };

            console.info('uploader', uploader);

            $scope.$watchCollection("ngModel", function () {
                $scope.uploader.clearQueue();
                console.info("ngModel "+$scope.ngModel);
                ($scope.ngModel || []).forEach(function (file) {
                    $scope.uploader.queue.push({
                        file: {
                            id: file.id,
                            name: file.fileName,
                            size: file.fileSize,
                            type: file.type
                        },
                        progress: 100,
                        isUploaded: true,
                        isSuccess: true
                    });
                });
                $scope.uploader.progress = 100;
            });

            $scope.firstPage = function() {
                $scope.currentPage = 0;
            };

            $scope.lastPage = function(count) {
                $scope.currentPage = Math.ceil(count/$scope.itemsPerPage)-1;
            };

            $scope.prevPage = function() {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };

            $scope.prevPageDisabled = function() {
                return $scope.currentPage === 0 ? "disabled" : "";
            };

            $scope.pageCount = function() {
                return Math.ceil($scope.ticketList.length/$scope.itemsPerPage)-1;
            };

            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.pageCount()) {
                    $scope.currentPage++;
                }
            };

            $scope.nextPageDisabled = function() {
                return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
            };

            $scope.minDate = new Date();
            $scope.disable = false;
            $scope.prestator = {};
            $scope.raions            = Raions.raions;
            $scope.prestatori        = Taxonomy.getArray({descriminator: 'descriminator', desc: 'prestator'});
            $scope.ticketList        =  [];
            $scope.ticketListOpen = {

            };
            $scope.ticketListReturned = {};
            $scope.applicationsOpen = {};
            $scope.applicationsReturned = {};


            $scope.selectorHandler = function(){
                if($scope.obj.prestator !== null && $scope.obj.prestator !== undefined ){
                    console.info('prestator ',$scope.obj.prestator);
                    $scope.selectSpecificatii($scope.obj.prestator);
                    if($scope.obj.year !== null && $scope.obj.year !== undefined ){
                        console.info('year ',$scope.obj.year);
                        $scope.getTicketsYearAndPrestator($scope.obj.year,$scope.obj.prestator);
                    }
                }
            };

            $scope.selectSpecificatii = function(prestator){
                $scope.prestator = prestator;
                $scope.specificatii     = Taxonomy.getArray({descriminator: 'specificul', desc:$scope.prestator.code}, function(data){
                    $scope.obj.specificatii   = data;
                },function(){
                    alert("NU exista specific pentru prestator "+$scope.prestator.code)
                });
                console.log("Prestator "+$scope.prestator.code);
            };

            $scope.getNamebyId = function(id, array) {
                var retval ;
                for(var i=0; i<array.length; i++ ){
                    if(array[i].id==id){
                        retval = array[i].nameRo;
                    }
                }
                return retval;
            };

            $scope.loadTickets = function(){
                console.log('Start load ticket');
                var deferred = $q.defer();
                $scope.prestatorName = $scope.prestator.nameRo;
                console.log($scope.uploader.queue);
                ($scope.uploader.queue || []).forEach(function (item) {
                    console.log($scope.specificatii);
                    item.url =  APPLICATION_SERVER + '/stub-backend/api/v1/tickets/upload/'+$scope.obj.prestator.id+'/'+$scope.specificatii[0].id+'/'+$scope.obj.price+'/'+new Date($scope.obj.year).getFullYear()
                });

                var checkUploadFinished = function () {
                    if ($scope.uploader.isUploading) {
                        setTimeout(checkUploadFinished, 200);
                    } else {
                        deferred.resolve();
                    }
                };

                $scope.uploader.uploadAll();
                setTimeout(checkUploadFinished, 500);

                return deferred.promise;
            };

            $scope.repartizarePerRaione = function(){
                Ticket.repartisation({action:'repartisation',prestator:$scope.prestator.id,year:$scope.year},function(){
                    Ticket.get({action:'repartisation',prestator:$scope.prestator.id,year:$scope.year}, function(date){
                        $scope.ticketListOpen = date;
                        alert("Success repartisation  ");
                    }, function(){
                        console.log("Error assign ticket");
                    });
                }, function(){
                    console.log("Error repartisation");
                });
            };

            $scope.getTicketsYearAndPrestator = function(year, prestator){
                console.log("change Date");
                $scope.ticketList = {};
                $scope.ticketListOpen = {};
                $scope.year = new Date(year).getFullYear();
                $scope.prestator = prestator;
                if(($scope.prestator != null) ){
                    console.log($scope.prestator.code+" "+$scope.year);
                    $scope.prestatorName = $scope.prestator.nameRo;
                    $scope.ticketList     = Ticket.get({action:'graphic',prestator:$scope.prestator.id,year:$scope.year});

                    Ticket.get({action:'repartisation',prestator:$scope.prestator.id,year:$scope.year},function(data){
                        console.log(data[0]);
                        var total = 0;
                        $scope.ticketListOpen = data;
                        $scope.ticketListOpen.forEach(function(item){
                            total +=item[2];
                            item.total = total;
                        });

                    });


                }
            };

            $scope.listTicketsByRaionId = function(raion){
                if((raion !== null && raion !== undefined ) && ($scope.obj.year !== null && $scope.obj.year !== undefined )){

                    Application.getArray({action:'raion',id:raion.id, raion:'OPEN'},function(date) {
                        $scope.applicationsOpen  = date;
                        console.log("Success Application get by raion / "+raion.raion);
                    },function(){
                        $scope.applications = [];

                    });

                    Ticket.get({action:'raion',prestator:raion.id,raion:new Date($scope.obj.year).getFullYear(),year:"OPEN"},
                        function(date){
                            $scope.raion = raion;
                            $scope.ticketListOpen = date;
                            console.log(raion.raion+"/"+$scope.ticketListOpen.length);
                        },function(){
                            console.log("Error get Date ");
                            $scope.ticketListOpen = [];
                            $scope.ticketListReturned = [];
                            $scope.applications= [];

                        });


                    Ticket.get({action:'raion',prestator:raion.id,raion:new Date($scope.obj.year).getFullYear(),year:"OPEN"},
                        function(date){
                            $scope.ticketListReturned = date;
                        },function(){
                            console.log("Error get Date ticketListReturned");
                            $scope.ticketListOpen = [];
                            $scope.ticketListReturned = [];
                            $scope.applications= [];
                        });
                }
            };

            $scope.changeRaion = function(raion){
                $scope.listTicketsByRaionId(raion);
            };

            $scope.nextStep =  function(tab) {
                console.log($scope.obj.year);
                $scope.active = {};
                $scope.active[tab] = true;
                $scope.ticketListOpen = {};
                $scope.applications = {};
                $scope.ticketList = [];
                $scope.obj.raion = {};
                $scope.obj.price = 0;
                $scope.obj.prestator = {};
                $scope.obj.specificul = {};
            };

            $scope.animationsEnabled = true;

            $scope.open = function () {
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'view/dialog/addPrestator.html',
                    controller: 'ModalInstanceAddPrestatorController',
                    resolve: {
                        prestatori: function () {
                            return $scope.prestatori;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.prestator = selectedItem;
                    $scope.prestatori.push($scope.prestator);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

                $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                };
            };

            $scope.save = function(){

            };
        }])

    .controller('RepartizareControllerDASS', ['$scope','userService', 'Raions','Specificul', '$window', '$routeParams','$location','Taxonomy','FileUploader','$q','Ticket','Application', '$modal', 'APPLICATION_SERVER',
        function($scope,userService, Raions,Specificul, $window, $routeParams,$location,Taxonomy,FileUploader,$q,Ticket,Application, $modal, APPLICATION_SERVER) {

            $scope.active = {
                prestator: true

            };

            $scope.minDate = new Date();
            $scope.disable = false;
            $scope.raions       = Raions.raions;
            $scope.specificatii = Specificul.specific;
            $scope.prestatori   = Taxonomy.getArray({descriminator: 'descriminator', desc: 'prestator'});
            $scope.tickets = {};
            $scope.countAprobatApp = 0;
            $scope.ticketsAssigned  = {};
            $scope.applicationsOpen = [];
            $scope.applications = [];
            $scope.applicationsUrgent = [];
            $scope.applicationsAprob = [];
            $scope.obj = {
                year: new Date().getTime(),
                raion:$window.localStorage.raion,
                localitate:$window.localStorage.localitate,
                trimestr:{},
                trimestrList:[
                    {name:'I',   value:'1'},
                    {name:'II',  value:'2'},
                    {name:'III', value:'3'},
                    {name:'IV',  value:'4'}]
            };

            $scope.itemsPerPage = 10;
            $scope.currentPage = 0;


            $scope.firstPage = function () {
                $scope.currentPage = 0;
            };

            $scope.lastPage = function (count) {
                $scope.currentPage = Math.ceil(count / $scope.itemsPerPage) - 1;
            };

            $scope.prevPage = function () {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };

            $scope.prevPageDisabled = function () {
                return $scope.currentPage === 0 ? "disabled" : "";
            };

            $scope.pageCount = function () {
                var retval = Math.ceil($scope.applications.length / $scope.itemsPerPage);
                if (retval > 0) {
                    retval--;
                }
                return retval;
            };

            $scope.nextPage = function () {
                console.log($scope.currentPage + " " + $scope.pageCount());
                if ($scope.currentPage < $scope.pageCount()) {
                    $scope.currentPage++;
                }
            };

            $scope.nextPageDisabled = function () {
                return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
            };

            $scope.getNameByRaion = function (raion, array) {
                var retval;
                for (var i = 0; i < array.length; i++) {
                    if (array[i].raion == raion) {
                        retval = array[i].nameRo;
                    }
                }
                return retval;
            };

            $scope.getNameById = function (id, array) {
                var retval;
                for (var i = 0; i < array.length; i++) {
                    if (array[i].id == id) {
                        retval = array[i].nameRo;
                    }
                }
                return retval;
            };

            $scope.selectorTickets = function () {
                $scope.repartisationList = [];
                $scope.applicationsOpen = [];
                $scope.applicationsUrgent = [];

                Application.getArray({action:'raion',id:$scope.obj.raion.id, raion:'OPEN',year:'true'},function(urgent) {
                    console.log('Application with is urgent Y - OK');
                    $scope.applicationsUrgent =  urgent;
                    console.log($scope.applicationsUrgent);
                },function(){
                    $scope.applications = [];
                });

                Application.getArray({action:'raion',id:$scope.obj.raion.id, raion:'OPEN'},function(noturgent) {
                    console.log(noturgent);
                    $scope.applicationsOpen= noturgent;
                    console.log("Success Application get by raion / "+$scope.obj.raion.raion);
                },function(){
                    console.log("Error get Date ");
                    $scope.ticketListOpen = [];
                    $scope.applications= [];

                });

                console.log($scope.obj.year+" "+$scope.obj.raion.id);
                Ticket.get({action:'raion',prestator:$scope.obj.raion.id,raion:new Date($scope.obj.year).getFullYear(),year:"OPEN"},
                    function(date){
                        console.log("Get Tickets");
                    });

                //Elibirare Bilet
                $scope.ticketsPerRaion = [];
                $scope.applications = [];
                console.log($scope.obj.raion);

                //get info about ticket repatrisation per raion (status OPEN)
                if(($scope.obj.year !== null && $scope.obj.year !== undefined)
                    && ($scope.obj.raion !== null && $scope.obj.raion !== undefined)
                    && ($scope.obj.trimestr !== null && $scope.obj.trimestr.value !== undefined)) {

                    console.log($scope.obj.year+" "+$scope.obj.raion.id+" "+$scope.obj.trimestr.value);

                    Ticket.get({
                        action: 'repartisation',
                        prestator: $scope.obj.raion.id,
                        raion: new Date($scope.obj.year).getFullYear(),
                        year: 'trimestr',
                        trimestr: $scope.obj.trimestr.value
                    },function(data){
                        $scope.repartisationList = data;

                        data.forEach(function(item){
                            Ticket.get({
                                action: 'repartisation',
                                prestator: $scope.obj.raion.id,
                                raion: new Date($scope.obj.year).getFullYear(),
                                year: 'trimestrmonths',
                                trimestr: $scope.obj.trimestr.value,
                                val:item[0].id
                            }, function(dataMon){
                                item[3] = dataMon[0][0];
                                item[4] = dataMon[0][1];
                                item[5] = dataMon[0][2];
                                item[6] = dataMon[0][3];
                            });

                        });
                        console.log(data);
                    });
                }
            };

            $scope.checkAprobat = function (aprobat, application) {
                if (aprobat) {
                    console.log(aprobat + " Aprobat ticket id = " + application.ticket.id);
                    application.status = 'APROBAT';
                    $scope.ticketsAssigned["T" + application.ticket.id].status = 'ASSIGNED';
                    console.log($scope.ticketsAssigned["T" + application.ticket.id]);
                    console.log("ticket  assigned " + $scope.ticketsAssigned["T" + application.ticket.id].status);
                } else {
                    console.log("Aprobat false ");
                    application.status = 'OPEN';
                    application.member.raionToTransfer = null;
                    application.member.localitateToTransfer = null;
                    $scope.ticketsAssigned["T" + application.ticket.id].status = 'OPEN';
                    console.log($scope.ticketsAssigned["T" + application.ticket.id]);
                    console.log(aprobat + " $scope.ticketsAssigned " + $scope.ticketsAssigned["T" + application.ticket.id].status);
                }
            };

            $scope.nextStep = function (tab) {
                $scope.active = {};
                $scope.active[tab] = true;

                $scope.repartisationListAprob = [];
                $scope.repartisationList = [];

                $scope.applicationsAprob = [];
                $scope.applications = [];

                $scope.obj.prestator = {};
                $scope.obj.yearAprob = 0;

                $scope.obj.prestatorAprob = {};


            };

            $scope.saveDate = function () {
                saveTicket = [];
                app = [];
                for (var index in $scope.applications) {

                    if ($scope.applications[index].status == "APROBAT") {
                        app.push($scope.applications[index])
                    }

                    if ($scope.applications[index].status == "OPEN") {

                        if ( $scope.applications[index].motiv !== undefined && $scope.applications[index].motiv !== null) {
                            $scope.applications[index].status = "NEAPROBAT"
                            console.log($scope.applications[index].motiv);
                        }

                        $scope.applications[index].ticket = null;
                        app.push($scope.applications[index]);

                    }

                    if ($scope.applications[index].status == "NEAPROBAT") {
                        if ( $scope.applications[index].motiv !== undefined ||  $scope.applications[index].motiv !== null) {
                            if ($scope.applications[index].motiv.length == 0) {
                                $scope.applications[index].status = "OPEN"
                                console.log("Change status APPROBAT->OPEN motiv is 0 length ");
                                app.push($scope.applications[index])
                            }
                        }
                    }
                }

                if ($scope.ticketsAssigned) {
                    for (var index in $scope.ticketsAssigned) {
                        if ($scope.ticketsAssigned[index].status == "ASSIGNED") {
                            saveTicket.push($scope.ticketsAssigned[index]);
                        }

                        if ($scope.ticketsAssigned[index].status == "OPEN") {
                            saveTicket.push($scope.ticketsAssigned[index]);
                        }
                    }


                    app = [];
                    for(var index in $scope.applications){

                        if($scope.applications[index].status == "APROBAT")
                            app.push($scope.applications[index]);

                        if($scope.applications[index].status == "OPEN"){
                            $scope.applications[index].ticket = null;
                            app.push($scope.applications[index]);
                        }

                    }
                    Application.update(app, function () {
                        Ticket.update(saveTicket, function () {
                            console.log(app.length + " updated and tickets updated " + saveTicket.length);
                        });
                    });
                }

                $location.path('/');
            };

            $scope.anulare = function () {
                $location.path('/');
            };

            $scope.open = function (application) {
                var htmlUrl = 'view/dialog/transferTicket.html';

                console.log(htmlUrl);

                dlg = $dialogs.create(
                    htmlUrl,
                    'ModalInstanceController',
                    {
                        application: function () {
                            return application;
                        }
                    }
                );

                dlg.result.then(function(selectedItem){
                    $scope.selected = selectedItem;
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });

            };

            $scope.openTransfer = function (application) {
                var modalInstance = $modal.open({
                    templateUrl: 'TransferBiletPopUp.html',
                    controller: 'ModalInstanceController',
                    resolve: {
                        application: function () {
                            return application;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });

            };

            $scope.saveRetur = function () {
                console.log("Start save");
                console.table($scope.applicationsAprob);
                var promises = [];
                for (var i = 0; i < $scope.applicationsAprob.length; i++) {
                    promises.push(
                        FileUploader.upload({
                            url: APPLICATION_SERVER+'/stub-backend/api/v1/tickets/' + $scope.applications[i].ticket.id + '/upload/1',
                            file: $scope.applications[i].ticket.bon
                        })
                    );

                }

                Application.update($scope.applicationsAprob, function () {
                    for(var i=0; i<$scope.applicationsAprob.length; i++){
                        if($scope.applicationsAprob[i].status == 'OPEN'){
                            $scope.applicationsAprob[i].ticket = null;
                        }
                    }
                    Application.update($scope.applicationsAprob, function () {
                        console.log('Application save');
                        $location.path('/');
                    });

                    if (promises.length > 0) {
                        $q.all(promises).then(function () {
                            $location.path('/');
                        });
                    }
                });

            };

            $scope.notTransfer = function(item) {
                var result = false;
                if (!item.member.raionToTransfer) {
                    result = true;
                }
                return result;
            };

            $scope.showAppStatus = function(app){
                if(app.status == 'OPEN' && app.ticket == null){
                    return 'In Asteptare';
                }

                if(app.ticket.status == 'CONFIRMED'){
                    return 'Bilet eliberat';
                }

                if(app.ticket.status == 'REFUSED'){
                    return 'Bilet refuzat';
                }

                if(app.ticket.status == 'ASSIGNED'){
                    return 'Bilet alocat';
                }


            }

        }])

    .controller('ModalInstanceController',['$scope','$modalInstance', function($scope,$modalInstance){

        $scope.cancel = function(){
            $modalInstance.dismiss('canceled');
        }; // end cancel

        $scope.save = function(){
            $modalInstance.close($scope.user.name);
        }; // end save

        $scope.hitEnter = function(evt){
            if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.name,null) || angular.equals($scope.name,'')))
                $scope.save();
        }; // end hitEnter

    }])

    .controller('ModalInstanceAddPrestatorController', ['$scope','Taxonomy','$modalInstance','prestatori', function($scope,Taxonomy,$modalInstance,prestatori){
        $scope.cancel = function(){
            $modalInstance.dismiss('canceled');
        }; // end cancel

        console.log("prestatori "+prestatori);
        $scope.prestatori = prestatori;

        $scope.selected = {
            prestator: {},
            specific: {}
        };

        $scope.objToString = function(){
            return 'addres:'+$scope.obj.prestatorAdress+';country:'+$scope.obj.prestatorCountry+';phone:'+$scope.obj.prestatorPhone+';route:'+$scope.obj.prestatorRoute+';'
        };

        $scope.objToXml = function(){
            return '<prestator><addres>'+$scope.obj.prestatorAdress+'</addres><country>'+$scope.obj.prestatorCountry+'</country><phone>'+$scope.obj             .prestatorPhone+'</phone><route>'+$scope.obj.prestatorRoute+'</route><urgent>'+$scope.obj.cazUrgent+'</urgent></prestator>';
        };

        $scope.save = function(){
            console.log($scope.objToXml());
            $scope.prestator ={
                discriminator:'prestator',
                nameRo:$scope.obj.prestatorName,
                nameRu:$scope.obj.prestatorName,
                ext:$scope.objToXml()
            };

            $scope.specific ={
                discriminator:'specificul',
                nameRo:$scope.obj.prestatorSpecific,
                nameRu:$scope.obj.prestatorSpecific
            };

            Taxonomy.get({descriminator:'maxCode',desc:'prestator'},function(data){
                var code = data.code;
                $scope.prestator.code = parseInt(code)+1;

                console.log("before incriment = "+data.code+" after incriment "+$scope.prestator.code);

                Taxonomy.save($scope.prestator,function(data){
                    Taxonomy.get({descriminator:'maxCode',desc:'specificul'},function(data_specific){
                        var code = data_specific.code;

                        $scope.specific.code =  parseInt(code)+1;
                        $scope.specific.value =  $scope.prestator.code;

                        console.log("before incriment = "+data_specific.code+" after incriment "+$scope.specific.code);

                        Taxonomy.save($scope.specific,function(data){
                            $scope.selected.specific = data;
                            console.log("Success save NEW specific");
                            $modalInstance.close($scope.selected.prestator);
                        },function(){
                            console.log("Error save NEW specific");
                        });

                    },function(){
                        console.log("Error get maxCode specificul");
                    });

                    $scope.selected.prestator = data;
                    console.log("Success save NEW prestator");
                }, function(){
                    console.log("Error save NEW prestator");
                });
            },function(){
                console.log("Error get maxCode prestator");
            });

        };

        $scope.hitEnter = function(evt){
            if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.name,null) || angular.equals($scope.name,'')))
                $scope.save();
        }; // end hitEnter

    }])

    .controller('RegistruController',['$scope','$rootScope','$window','Raions', '$routeParams','$location','Taxonomy','FileUploader','$q','Ticket','Application',
        function($scope,$rootScope,$window,Raions, $routeParams,$location,Taxonomy,FileUploader,$q,Ticket,Application) {

            $scope.active = {
                close:true
            };

            $scope.raions            = Raions.raions;
            $scope.prestatori        = Taxonomy.getArray({descriminator: 'descriminator', desc: 'prestator'});

            $scope.applications = {};
            $scope.obj = {
                year: new Date().getTime()
                /*raion:$window.localStorage.raion,
                 localitate:$window.localStorage.localitate*/
            };

            $scope.itemsPerPage = 10;
            $scope.currentPage = 0;


            $scope.firstPage = function () {
                $scope.currentPage = 0;
            };

            $scope.lastPage = function (count) {
                $scope.currentPage = Math.ceil(count / $scope.itemsPerPage) - 1;
            };

            $scope.prevPage = function () {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };

            $scope.prevPageDisabled = function () {
                return $scope.currentPage === 0 ? "disabled" : "";
            };

            $scope.pageCount = function () {
                var retval = Math.ceil($scope.applications.length / $scope.itemsPerPage);
                if (retval > 0) {
                    retval--;
                }
                return retval;
            };

            $scope.nextPage = function () {
                console.log($scope.currentPage + " " + $scope.pageCount());
                if ($scope.currentPage < $scope.pageCount()) {
                    $scope.currentPage++;
                }
            };

            $scope.nextPageDisabled = function () {
                return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
            };

            $scope.selectorHandler = function(){
                //get info about ticket repatrisation per raion (status OPEN)
                if(($scope.obj.year !== null && $scope.obj.year !== undefined)
                    && ($scope.obj.raion !== null && $scope.obj.raion !== undefined)
                    && ($scope.obj.prestator !== null && $scope.obj.prestator !== undefined)){
                    console.log("Year is not null");
                    console.log("Raion is not null");
                    console.log("prestator is not null");

                    Ticket.get({action:'registru',prestator:$scope.obj.prestator.id,raion:new Date($scope.obj.year).getFullYear(),year:$scope.obj.raion.id},
                        function(data){
                            $scope.obj.allTickets = data;

                        });
                }
            };


            $scope.nextStep =  function(tab) {
                $scope.active = {};
                $scope.active[tab] = true;
                $scope.applications = {};
                dataStart = 0;
                dataEnd = 0;

                $scope.obj.prestator     = {};
                $scope.obj.dataE = 0;
                $scope.obj.dataS = 0;
                $scope.obj.prestatorR     = {};
                $scope.obj.dataER = 0;
                $scope.obj.dataSR = 0;
            };

            $scope.getNameByRaion = function (raion, array) {
                var retval;
                for (var i = 0; i < array.length; i++) {
                    if (array[i].raion == raion) {
                        retval = array[i].nameRo;
                    }
                }
                return retval;
            };

            $scope.getNamebyId = function(code, array) {
                var retval ;
                for(var i=0; i<array.length; i++ ){
                    if(array[i].code==code){
                        retval = array[i].nameRo;
                    }
                }
                return retval;
            };

            $scope.selectApplications = function(val) {
                if(val == 1) {
                    if ($scope.obj.dataS > 0) {
                        dataStart = $scope.obj.dataS;
                    }

                    if ($scope.obj.dataE > 0) {
                        dataEnd = $scope.obj.dataE;
                    }

                    if ((dataStart > 0 && dataEnd > 0) && $scope.obj.prestator.id > 0) {
                        console.log("Success dataS - " + dataStart + " dataE - " + dataEnd + " prestastorId " + $scope.obj.prestator.code + " raion - "+$scope.obj.raion.raion );
                        $scope.applications = Application.getArray({
                            action: 'return',
                            id: $scope.obj.raion.raion,
                            raion: $scope.obj.prestator.code,
                            specific: dataStart,
                            year:dataEnd,
                            prestator:'APROBAT'
                        });
                    } else {
                        console.log("Error dataS - " + dataStart + " dataE - " + dataEnd + " prestastorId" + $scope.obj.prestator.id + " raion - " + $scope.obj.raion.raion);
                    }
                }else{
                    if ($scope.obj.dataSR > 0) {
                        dataStart = $scope.obj.dataSR;
                    }

                    if ($scope.obj.dataER > 0) {
                        dataEnd = $scope.obj.dataER;
                    }


                    if ((dataStart > 0 && dataEnd > 0) && $scope.obj.prestatorR.id > 0) {
                        console.log("Success dataS - " + dataStart + " dataE - " + dataEnd + " prestastorId " + $scope.obj.prestator.id + " raion - " + $scope.obj.raionR.raion);
                        $scope.applications = Application.getArray({
                            action: $scope.obj.raionR.raion,
                            id: $scope.obj.prestatorR.code,
                            raion: dataStart,
                            specific: dataEnd,
                            year:'CLOSE'
                        });
                    } else {
                        console.log("Error dataS - " + dataStart + " dataE - " + dataEnd + " prestastorIdR " + $scope.obj.prestatorR.id + " raionR - " + $scope.obj.raion);
                    }
                }



            };

            $scope.save = function () {
                console.log("Start save");

                var promises = [];
                for (var i = 0; i < $scope.applications.length; i++) {
                    if ($scope.applications[i].ticket.bon != null) {
                        $scope.applications[i].status = "CLOSE";
                        $scope.applications[i].ticket.status = "CLOSE";

                        promises.push(
                            $upload.upload({
                                url: APPLICATION_SERVER+'/stub-backend/api/v1/tickets/' + $scope.applications[i].ticket.id + '/upload/1',
                                file: $scope.applications[i].ticket.bon
                            })
                        );
                    } else {
                        console.log('Bon is not loaded');
                    }
                }
                console.log($scope.applications);
                Application.update($scope.applications, function () {
                    console.log('Bon save');
                    if (promises.length > 0) {
                        $q.all(promises).then(function () {
                            $location.path('/');
                        });
                    }
                });

            };
            $scope.close = function(){
                $location.path('/');
            };

        }])

    .controller('TicketController', ['$scope', '$routeParams','$location','Taxonomy', function($scope, $routeParams,$location,Taxonomy) {

        $scope.raions   = Taxonomy.getArray({descriminator: 'descriminator',desc: 'raion'}, function(){
            $scope.rowCollection = [].concat($scope.raions);
        });

        //remove to the real data holder
        $scope.removeItem = function removeItem(row) {
            var index = $scope.raions.indexOf(row);
            if (index !== -1) {
                $scope.raions.splice(index, 1);
            }
        };

        $scope.getters={
            id: function (value) {
                //this will sort by the length of the first name string
                return value.id;
            }
        };


        $scope.save = function(){
            $location.path('/');
        };
    }])

    .controller('NewApplicationController',['$scope','$routeParams','$route', '$rootScope', 'Raions', 'Report', 'Specificul','Document', 'Application', 'Taxonomy',  'Member', '$http', '$q','$location', '$window', 'FileUploader','MTIC','MIN_PERIOD_BETWEEN_APPLICATION','APPLICATION_SERVER',
        function($scope,$routeParams,$route, $rootScope, Raions, Report, Specificul,Document, Application, Taxonomy, Member, $http, $q,$location, $window, FileUploader,MTIC,MIN_PERIOD_BETWEEN_APPLICATION,APPLICATION_SERVER) {

            $scope.raions               = Raions.raions;
            $scope.raionsGuardian       = Raions.raions;
            $scope.localitaties         = [];
            $scope.localitateGuardian   = {};
            $scope.physicalPersonData   = {};


            $scope.minDate = new Date();

            $scope.application = {
                member:{
                    localitate : {},
                    raion :{}
                }
            };

            $scope.open = function (application) {
                var htmlUrl = 'view/dialog/returnTicket.html';

                console.log(htmlUrl);

                dlg = $dialogs.create(
                    htmlUrl,
                    'ModalInstanceController',
                    {
                        application: function () {
                            return application;
                        }
                    }
                );

                dlg.result.then(function(selectedItem){
                    $scope.selected = selectedItem;
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });

            };

            $scope.selectFile = function(item){
                $scope.obj.countFiles++;
            };

            $scope.listOfDocType = [
                {
                    name:'Cerere', type:1
                },
                {
                    name:'Certificatul medical al 070E', type:2
                },
                {
                    name:'Copia Actului de identitate', type:3
                },
                {
                    name:'Recomandarea centrului de reabilitare/recuperare', type:4
                },
                {
                    name:'Concluzia Consiliului de expertiza medicala si vitalitatii', type:5
                },
                {
                    name:'Copii din paginile principale din carnetul de munca', type:6
                },
                {
                    name:'Legitimatia de pensionar', type:7
                },
                {
                    name:'Copia pasaportului RM', type:8
                },
                {
                    name:'Copia Actului de identitate insotitor', type:9
                }
            ];

            $scope.checkDoc = function(item){
                console.log(item);
            };

            $scope.specificatii         = Specificul.specific;
            $scope.obj            = {
                raion:{},
                localitate:{},
                prestator:{},
                invalid: false,
                nextRegistrationDate:MIN_PERIOD_BETWEEN_APPLICATION,
                add:true,
                countFiles:0
            };

            console.log("Start NewApplicationController");

            /************** Upload File **************/
            var uploader = $scope.uploader = new FileUploader({
                scope: $scope
            });

            //check mode - add ot edit application, if exists id - cerere/:id then edit mode.
            if($routeParams.id !== null && $routeParams.id !== undefined){
                console.log("$routeParams.id is "+$routeParams.id);
                $scope.obj.add = false;
                Application.get({action: $routeParams.id},function(app){
                    $scope.application = app;
                    console.log("Application");
                    console.log($scope.application);
                    $scope.obj.date = new Date($scope.application.date);
                    $scope.raions[0] = $scope.application.member.raion;
                    $scope.localitaties[0] = $scope.application.member.localitate;
                    $scope.obj.prestator   = Taxonomy.getArray({descriminator: 'prestator', desc:$scope.application.specificatii.value});


                    Document.getArray({application_id:'download', action:'info', size:$scope.application.id},function(data){
                        $scope.application.documents = data;
                        console.log(data);

                        /*Fill queue of elements files */
                        for(var i = 0; i< data.length; i++ ){
                            $scope.uploader.queue.push({
                                file: {
                                    id: $scope.application.documents[i]["id"],
                                    name: $scope.application.documents[i]["name"],
                                    size: $scope.application.documents[i]["size"]
                                },
                                isUploaded: true,
                                isSuccess: true
                            });
                        }

                    });

                    if($scope.application.documentPresent.size > 0 || $scope.application.documents != null){
                        $("#uploadFiles").prop( "disabled", true );
                        $(".checkboxDoc").prop( "disabled", true );
                    }
                }, function(){
                    alert("NU exista cerere cu id - "+$routeParams.id);
                    $location.path('/');
                });

            }


            uploader.filters.push({
                name: 'customFilter',
                fn: function(item, options) {
                    console.log("Push item"+item);
                    return this.queue.length < 10;
                }
            });

            // CALLBACKS
            uploader.onWhenAddingFileFailed = function(item , filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function(fileItem) {
                console.info('onAfterAddingFile', fileItem);
            };
            uploader.onAfterAddingAll = function(addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
            };
            uploader.onBeforeUploadItem = function(item) {
                console.info('onBeforeUploadItem', item);
            };
            uploader.onProgressItem = function(fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            uploader.onProgressAll = function(progress) {
                console.info('onProgressAll', progress);
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                console.info('onSuccessItem', fileItem, response, status, headers);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };
            uploader.onCancelItem = function(fileItem, response, status, headers) {
                $scope.removeFile(fileItem);
                console.info('onCancelItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function(fileItem, response, status, headers) {
                console.info('onCompleteItem', fileItem, response, status, headers);
            };
            uploader.onCompleteAll = function() {
                console.info('onCompleteAll');
            };

            console.info('uploader', uploader);

            $scope.$watchCollection("ngModel", function () {
                $scope.uploader.clearQueue();
                ($scope.ngModel || []).forEach(function (file) {
                    $scope.uploader.queue.push({
                        file: {
                            id: file.id,
                            name: file.fileName,
                            size: file.fileSize,
                            type: file.type
                        },
                        progress: 100,
                        isUploaded: true,
                        isSuccess: true
                    });
                });
                $scope.uploader.progress = 100;
            });

            $scope.uploadFiles = function () {
                console.log('upload file');
                console.log($scope.application.documentPresent);
                var deferred = $q.defer();

                if($routeParams.id !== undefined && $routeParams.id !== null){

                    ($scope.uploader.queue || []).forEach(function (item) {
                        console.log("id : "+$routeParams.id+" item : "+item.file.name+" size : "+item.file.size);
                        item.url = APPLICATION_SERVER + '/stub-backend/api/v1/documents/' +$routeParams.id+ "/upload/"+item.file.name+"/"+item.file.size;
                    });

                    var checkUploadFinished = function () {
                        if ($scope.uploader.isUploading) {
                            setTimeout(checkUploadFinished, 200);
                        } else {
                            deferred.resolve();
                        }
                    };
                    $scope.uploader.uploadAll();

                    setTimeout(checkUploadFinished, 500);


                }else{
                    alert("Salvati cererea");
                }

                Application.update($scope.application, function () {
                    console.log("Update application " + $scope.application.id);
                    $("#uploadFiles").prop( "disabled", true );
                    $(".checkboxDoc").prop( "disabled", true );
                });

                return deferred.promise;
            };
            $scope.downloadFile = function (item) {
                $http({
                    url: APPLICATION_SERVER + '/stub-backend/api/v1/documents/download/'+item.file.id,
                    method: 'GET',
                    responseType: 'arraybuffer',
                    transformResponse: function (data, headersGetter) {
                        $rootScope.httpProgress = false;
                        return {data: data};
                    },
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/octet-stream'
                    }
                }).success(function (data) {
                    var blob = new Blob([data.data], {
                        type: 'application/octet-stream'
                    });
                    window.saveAs(blob, item.file.name);
                });
            };
            $scope.removeFile = function (item) {
                item.remove();
            };
            /******************************************/

            $scope.selectLoalityByRaionId = function (type){
                if(type == 'guardian'){
                    console.log("Raion "+$scope.application.guardian.raion.nameRo);
                    $scope.application.guardianRaion = $scope.application.guardian.raion;
                    $scope.localitateGuardian = Taxonomy.getArray({descriminator: 'locality',desc:'raion', id:$scope.application.guardian.raion.raion});
                    console.log("Guardian "+$scope.application.guardian.raion+" localitate "+ $scope.localitateGuardian);
                }else{
                    console.log("Raion "+$scope.application.member.raion.nameRo);
                    $scope.localitaties = Taxonomy.getArray({descriminator: 'locality',desc:'raion', id:$scope.application.member.raion.raion});
                }

            };

            $scope.selectPrestatorBySpecificCode = function (){
                console.log("Specific code  "+$scope.application.specificatii.value);
                $scope.obj.prestator = Taxonomy.getArray({descriminator: 'prestator', desc:$scope.application.specificatii.value}, function(){
                    $scope.application.is_urgent = null;


                    ///parse xml from prestator.ext
                    var xmlDoc = $.parseXML($scope.obj.prestator[0].ext);
                    var $xml = $(xmlDoc);
                    var $Name = $xml.find('urgent');
                    $('#isUrgentYes').prop('disabled', $Name[0].textContent == 'true' ? false : true);
                    $('#isUrgentNo').prop('disabled',  $Name[0].textContent == 'true' ? false : true);

                }, function(){
                    alert("NU exista prestator pentru specificul "+$scope.application.specificatii.nameRo)
                });
            };

            $scope.clearField = function(type){
                if(type !== 'guardian') {
                    $scope.application = {
                        member:{
                            idnp:$scope.application.member.idnp
                        }
                    };
                }else{
                    $scope.application = {
                        member :{
                            idnp:$scope.application.member.idnp,
                            guardian :{
                                idnp: $scope.application.guardian.idnp
                            }
                        }
                    };
                }

                $scope.obj.invalid = false;
            };

            $scope.checkIdnp = function(type){
                $scope.obj.invalid = false;
                if(type !== 'guardian') {
                    if(!angular.isUndefined($scope.application.member.idnp) && $scope.application.member.idnp.length > 12) {
                        console.log(type + " IDNP - " + $scope.application.member.idnp);

                        //Get from data base
                        Application.get({
                                action: 'last',
                                id: 'idnp',
                                raion: $scope.application.member.idnp
                            },
                            function (data) {

                                data.id = null;
                                data.member.id = null;
                                $scope.obj.nextRegistrationDate = $scope.obj.nextRegistrationDate + data.date;


                                /*Check applicastion perioad 3 years*/
                                if((new Date().getTime()) < ($scope.obj.nextRegistrationDate)){
                                    $scope.obj.invalid = true;
                                }

                                console.log("Date from Data Base stub Tratament");

                                $scope.application.member = data.member;

                                console.log($scope.application);
                                console.log(data);

                                $scope.localitaties = [];
                                $scope.localitaties[0] = data.member.localitate;

                                $scope.raions = [];
                                $scope.raions[0] = data.member.raion;

                            },
                            function (error) {
                                console.log(error);
                                console.log("Start get date from registru");

                                MTIC.get({idnp: $scope.application.member.idnp},
                                    function (data) {
                                        console.log("Date from Registru");
                                        console.log(data);

                                        $scope.application.member.firstName  = data.firstname == null ? '' : data.firstname;
                                        $scope.application.member.lastName   = data.lastname;
                                        $scope.application.member.patronimic = data.secondname;

                                        $scope.application.member.seria = angular.isObject(data.identdocument) ? data.identdocument.series : '';
                                        /* $scope.application.member.idnp = data.idnp;*/

                                        if (data.address) {
                                            Taxonomy.get({
                                                descriminator: 'locality',
                                                desc: data.address.administrativecode
                                            }, function (locality) {
                                                $scope.localitaties = [];
                                                $scope.localitaties[0] = locality;
                                                $scope.application.member.localitate = locality;

                                                Taxonomy.getArray({
                                                    descriminator: 'raion',
                                                    desc: locality.raion
                                                },function(raion){
                                                    $scope.raions = [];
                                                    $scope.raions[0] = raion[0];
                                                    $scope.application.member.raion = raion[0];
                                                    console.log(raion[0]);
                                                });
                                            });

                                            $scope.application.member.administrativecode = data.address.administrativecode;
                                            $scope.application.member.country   = data.address.country;
                                            $scope.application.member.street    = data.address.street;
                                            $scope.application.member.house     = data.address.house;
                                            $scope.application.member.block     = data.address.block;
                                            $scope.application.member.flat      = data.address.flat;

                                        }

                                        console.log($scope.application);
                                        console.log("/********************************************************/");
                                    });
                            });
                    }
                }else {
                    if (!angular.isUndefined($scope.application.guardian.idnp) && $scope.application.guardian.idnp.length > 12) {
                        console.log(type + " IDNP - " + $scope.application.guardian.idnp);
                        if ($scope.application.member.idnp != $scope.application.guardian.idnp) {
                            $scope.obj.idnp = $scope.application.guardian.idnp;

                            //Get from data base
                            Application.get({
                                    action: 'last',
                                    id: 'idnp',
                                    raion: $scope.application.guardian.idnp
                                },
                                function (data) {

                                    data.id = null;
                                    data.guardian.id = null;
                                    $scope.obj.nextRegistrationDate = $scope.obj.nextRegistrationDate + data.date;


                                    /*Check applicastion perioad 3 years*/
                                    if((new Date().getTime()) < ($scope.obj.nextRegistrationDate)){
                                        $scope.obj.invalid = true;
                                    }

                                    console.log("Date from Data Base stub Tratament");

                                    $scope.application.guardian = data.guardian;

                                    $scope.localitateGuardian = [];
                                    $scope.localitateGuardian[0] = data.guardian.localitate;

                                    $scope.raionsGuardian = [];
                                    $scope.raionsGuardian[0] = data.guardian.raion;

                                },
                                function (error) {
                                    console.log(error);
                                    console.log("Start get date from registru");

                                    MTIC.get({idnp: $scope.application.guardian.idnp},
                                        function (registruData) {
                                            console.log("Date from Registru");
                                            console.log(registruData);

                                            $scope.application.guardian.firstName  = registruData.firstname == null ? '' : registruData.firstname;
                                            $scope.application.guardian.lastName   = registruData.lastname;
                                            $scope.application.guardian.patronimic = registruData.secondname;

                                            $scope.application.guardian.seria = angular.isObject(registruData.identdocument) ? registruData.identdocument.series : '';
                                            $scope.application.guardian.idnp = registruData.idnp;

                                            if (registruData.address) {
                                                Taxonomy.get({
                                                    descriminator: 'locality',
                                                    desc: registruData.address.administrativecode
                                                }, function (locality) {
                                                    $scope.localitateGuardian = [];
                                                    $scope.localitateGuardian[0] = locality;
                                                    $scope.application.guardian.localitate = locality;

                                                    Taxonomy.getArray({
                                                        descriminator: 'raion',
                                                        desc: locality.raion
                                                    },function(raion){
                                                        $scope.raionsGuardian = [];
                                                        $scope.raionsGuardian[0] = raion[0];
                                                        $scope.application.guardian.raion = raion[0];
                                                        console.log(raion[0]);
                                                    });
                                                });

                                                $scope.application.guardian.administrativecode = registruData.address.administrativecode;
                                                $scope.application.guardian.country   = registruData.address.country;
                                                $scope.application.guardian.street    = registruData.address.street;
                                                $scope.application.guardian.house     = registruData.address.house;
                                                $scope.application.guardian.block     = registruData.address.block;
                                                $scope.application.guardian.flat      = registruData.address.flat;

                                            }

                                            console.log($scope.application);
                                            console.log("/********************************************************/");
                                        });
                                });




                            /*  $scope.physicalPersonData = MTIC.get({idnp: $scope.application.guardian.idnp}, function () {
                             console.log("Date from Registru for Guardian");
                             console.log($scope.physicalPersonData);

                             $scope.application.guardian.is_guardian = true;
                             $scope.application.guardian.firstName = $scope.physicalPersonData.firstname;
                             $scope.application.guardian.lastName = $scope.physicalPersonData.lastname;
                             $scope.application.guardian.patronimic = $scope.physicalPersonData.secondname;

                             $scope.application.guardian.seria = angular.isObject($scope.physicalPersonData.identdocument) ?$scope.physicalPersonData.identdocument.series : '';
                             $scope.application.guardian.idnp = $scope.physicalPersonData.idnp;

                             if ($scope.physicalPersonData.address) {
                             $scope.application.guardian.localitate = Taxonomy.get({
                             descriminator: 'locality',
                             desc: $scope.physicalPersonData.address.administrativecode
                             });

                             $scope.application.guardian.localitate.$promise.then(function () {
                             $scope.application.guardian.raion = Taxonomy.get({
                             descriminator: 'raion',
                             desc: $scope.application.guardian.localitate.raion
                             });

                             $scope.localitateGuardian = [];
                             $scope.localitateGuardian[0] = $scope.application.guardian.localitate;
                             $scope.application.guardian.raion.$promise.then(function () {
                             $scope.raionsGuardian = [];
                             $scope.raionsGuardian[0] = $scope.application.guardian.raion;
                             });

                             }
                             );

                             $scope.application.guardian.administrativecode = $scope.physicalPersonData.address.administrativecode;
                             $scope.application.guardian.country = $scope.physicalPersonData.address.country;
                             $scope.application.guardian.street = $scope.physicalPersonData.address.street;
                             $scope.application.guardian.house = $scope.physicalPersonData.address.house;
                             $scope.application.guardian.block = $scope.physicalPersonData.address.block;
                             $scope.application.guardian.flat = $scope.physicalPersonData.address.flat;
                             }
                             });*/
                        } else {
                            alert("Insotitor si benificiar cu IDNP IDENTIC!!!");
                        }
                    }
                }
            };

            $scope.save = function() {
                console.log("Start Save");
                console.log($scope.application);
                $scope.application.status = "OPEN";
                $scope.application.idnp =  $scope.application.member.idnp;
                $scope.application.raionCode = $scope.application.member.raion.id;
                $scope.application.date = new Date().getTime();
                $scope.application.member.is_applicant = true;

                console.log(new Date().getTime()+" - "+$scope.obj.date+" invalid : "+$scope.obj.invalid);
                if((!$scope.obj.invalid) || $scope.application.is_urgent){
                    Application.save({action:window.localStorage.username},$scope.application, function (data) {
                        console.log("Start save application with id " + data.id);
                        $location.path('/cerere/'+data.id);
                    });
                    //}
                }else{
                    alert("Beneficiarul a beneficiat de bilet in ultimii 3 ani !!!");
                }
            };

            $scope.checkNeedData = function(){
                var retval = true;
                var elements = document.getElementsByClassName('has-error');
                //console.log(elements.length);

                /*if($scope.application.guardian != null){
                 retval = (elements.length-1) <= 0;
                 }else{
                 retval = (elements.length-1) <= 7;
                 }*/
                return retval;
            };

            $scope.confirmTicket = function(){
                Report.get({action:'generate', type:'ticket',id:$scope.application.id}, function(data){
                    console.log("Ticket generated "+$scope.application.id);
                    $route.reload();
                });

            };

            $scope.refuzTicket = function(){
                $scope.application.ticket.status = 'REFUSED';
                var ticketP = [];
                ticketP.push($scope.application.ticket);
                console.log(ticketP);
                Ticket.update(ticketP, function(ticket){
                    console.log("Ticket updated "+ticket.id);

                    $scope.application.ticketId = null;
                    $scope.application.ticket = null;

                    Application.update($scope.application, function(application){
                        console.log("Application updated "+application.id);
                    });
                    $route.reload();
                });


            }
        }])

    .controller('ApplicationController', ['$scope', '$routeParams', 'Application','Taxonomy', 'APPLICATION_SERVER','$location',
        function($scope,$routeParams, Application, Taxonomy,APPLICATION_SERVER,$location) {
            $scope.application = {};
            $scope.raions = {};
            $scope.obj            = {
                prestator:{}
            };

            $scope.application = Application.get({action: $routeParams.id},function(){
                console.log($scope.application);
                $scope.obj.date = new Date($scope.application.date);
                $scope.raions[0] = $scope.application.member.raion;
                $scope.obj.prestator = Taxonomy.getArray({descriminator: 'prestator', desc:$scope.application.specificatii.value});
            }, function(){
                alert("NU exista cerere cu id - "+$routeParams.id);
                $location.path('/');
            });

        }])

    .controller('TaxonomyController', ['$scope', '$routeParams', 'Taxonomy', function($scope, $routeParams, Taxonomy) {
        $scope.taxonomy   = [];

        if($routeParams.desc.length>0){
            alert('with params');
            $scope.taxonomy   = Taxonomy.getArray({descriminator: $routeParams.descriminator,desc: $routeParams.desc});
        }else{
            alert('without params');
            $scope.taxonomy = Taxonomy.query();
        }

    }])

    .controller('FeedBackController', ['$scope', function($scope) {
        $scope.taxonomy   = [];
    }]);
