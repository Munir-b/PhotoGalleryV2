(function() {
  //https://github.com/danialfarid/ng-file-upload#usage
  'use strict';
  angular.module('photoGallery').controller('fileUploadCtrl',['$scope','Upload', '$timeout', function ($scope, Upload, $timeout){
    //$scope.uploadFiles = function(files) {
    //  $scope.files = files;
    //  angular.forEach(files, function(file) {
    //    if (file && !file.$error) {
    //      file.upload = Upload.upload({
    //        url: '/uploads',
    //        file: file
    //      });
    //      file.upload.then(function (response) {
    //        $timeout(function () {
    //          file.result = response.data;
    //        });
    //      }, function (response) {
    //        if (response.status > 0)
    //          $scope.errorMsg = response.status + ': ' + response.data;
    //      });
    //
    //      file.upload.progress(function (evt) {
    //        file.progress = Math.min(100, parseInt(100.0 *
    //          evt.loaded / evt.total));
    //      });
    //    }
    //  });
    //}
  }]);
})();

