(function () {
  'use strict';

  angular
    .module('photoGallery')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', 'AuthenticationService'];
  function LoginController($location, AuthenticationService) {
    var vm = this;

    vm.login = login;

    (function initController() {
      // reset login status
      AuthenticationService.ClearCredentials();
    })();

    function login() {
      vm.dataLoading = true;
      AuthenticationService.Login(vm.username, vm.password, function (response) {
        if (response.data.success) {
          AuthenticationService.SetCredentials(vm.username);
          $location.path('/home');
        } else {
          alert('authentication failure');
          vm.dataLoading = false;
        }
      });
    };
  }

})();

