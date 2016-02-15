angular
    .module('bilete')
    .directive('attachments', [
        '$rootScope', '$http', '$q', 'FileUploader', 'APPLICATION_SERVER',
        function ($rootScope, $http, $q, FileUploader, APPLICATION_SERVER) {
            return {
                templateUrl: 'view/directives/attachments.html',
                restrict: 'EA',
                scope: {
                    ngModel: '=',
                    path: '='
                },

                controller: ['$scope', '$element', '$attrs', function ($scopfe) {
                    $scope.uploader = new FileUploader({
                        scope: $scope
                    });

                    $scope.$watchCollection("ngModel", function () {
                        $scope.uploader.clearQueue();
                        ($scope.ngModel || []).forEach(function (file) {
                            $scope.uploader.queue.push({
                                file: {
                                    id: file.id,
                                    name: file.fileName,
                                    size: file.fileSize
                                },
                                progress: 100,
                                isUploaded: true,
                                isSuccess: true
                            });
                        });
                        $scope.uploader.progress = 100;
                    });

                    var uploadFiles = function () {
                        var deferred = $q.defer();
                        ($scope.uploader.queue || []).forEach(function (item) {
                            item.url = APPLICATION_SERVER + '/siaas-backend/api/v1/users/' + SiaasUtils.getUsername() + '/' + $scope.path;
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

                    $scope.$on('uploadFiles', function () {
                        uploadFiles().then(function () {
                            $scope.$emit('uploadComplete');
                        });
                    });

                    $scope.downloadFile = function (item) {
                        $http({
                            url: APPLICATION_SERVER + '/siaas-backend/api/v1/users/' + SiaasUtils.getUsername() + '/' + $scope.path + '/' + item.file.id + '/download',
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
                }]
            };
        }]);
