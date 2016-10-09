(function () {
  'use strict';

  angular
    .module('photoGallery')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['userService', '$location', '$rootScope'];
  function RegisterController(userService, $location, $rootScope) {
    var vm = this;

    vm.register = register;

    function register() {
      vm.dataLoading = true;
      userService.Create(vm.user)
        .then(function (response) {
          if (response.data.success) {
            alert('Registration successful');
            $location.path('/login');
          } else {
            alert(response.data.message);
            vm.dataLoading = false;
          }
        });
    }
  }

})();
