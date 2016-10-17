(function () {
  'use strict';

  angular
    .module('photoGallery')
    .factory('userService', userService);

  userService.$inject = ['$http'];
  function userService($http) {
    var service = {};

    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;
    service.AddGallery = AddGallery;
    service.AddPhotos = AddPhotos;
    service.DownlaodPhotos = DownloadPhotos;

    return service;

    function GetByUsername(username) {
      return $http.get('/api/users/'+username);
    }
    function Create(user) {
      return $http.post('/api/signup', user);
    }

    function Delete(username) {
      return $http.delete('/api/users/'+username);
    }

    function Update(user) {
      return $http.put('/api/users/'+user.username,user);
    }
    function AddGallery(galleryName,username) {
      return $http.post('/api/galleries/'+username,{galleries:galleryName});
    }
    function AddPhotos(photos,username) {
      return $http.put('/api/photos/'+username,photos);
    }
    function DownloadPhotos(username) {
      return $http.get('/api/photos/'+username);
    }
  }
})();
