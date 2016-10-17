(function() {
  'use strict';

  //https://github.com/angular-ui/bootstrap
  angular.module('photoGallery').controller('modalCtrl', function ($scope, $modal) {


    $scope.open = function (template, size) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: template,
        controller: 'ModalInstanceCtrl',
        size: size
      });

      modalInstance.result.then(
      function() {
      }, function () {
      });
    };

  });

  angular.module('photoGallery').controller('ModalInstanceCtrl', function ($scope, $modalInstance, GalleriesService) {


    $scope.ok = function (gallery) {

      console.log(gallery);
      GalleriesService.addGalleryToCurrentUser(gallery);
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

})();