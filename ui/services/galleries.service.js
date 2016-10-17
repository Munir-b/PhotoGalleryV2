(function () {
  'use strict';

  angular
    .module('photoGallery')
    .factory('GalleriesService', ['userService', '$rootScope', function(userService, $rootScope) {
      var service = {};

      service.addGalleryToCurrentUser = addGalleryToCurrentUser;

      return service;

      function addGalleryToCurrentUser(gallery) {
        var currentUserName = $rootScope.globals.currentUser.username;
        userService.GetByUsername(currentUserName).then(function(currentUser){
          userService.AddGallery(gallery.name,currentUser.username);
        });
      }
    }]);
})();



