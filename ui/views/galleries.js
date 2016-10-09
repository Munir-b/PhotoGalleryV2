(function() {
  'use strict';
  angular.module('photoGallery').controller('galleriesCtrl',['$scope','$rootScope', 'userService',function($scope, $rootScope, userService){
    $scope.currentUser = $rootScope.globals.currentUser.username;
    userService.GetByUsername($scope.currentUser).then(function(user){
      $scope.galleries = user.galleries;
    });
  }]);
})();
