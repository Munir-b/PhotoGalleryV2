(function () {
  'use strict';

  angular
    .module('photoGallery')
    .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$rootScope'];
  function AuthenticationService($http, $rootScope) {
    var service = {};

    service.Login = Login;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

    function Login(username, password, callback) {
      $http.post('/api/authenticate', { username: username, password: password })
        .then(function (response) {
          callback(response);
      });
    }

    function SetCredentials(username) {
      $rootScope.globals.currentUser = {
        username: username
      }
    }

    function ClearCredentials(){
      $rootScope.globals.currentUser = null;
    }
  }

})();
