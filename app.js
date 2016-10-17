(function() {
  'use strict';

  angular.module('photoGallery', ['ngRoute']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/home',{
      controller: 'homeCtrl',
      templateUrl:'ui/views/home.html',
      scope: {}
    }).
    when('/galleries',{
      controller:'galleriesCtrl',
      templateUrl:'ui/views/galleries.html',
      scope:{}
    }).
    when('/othersGalleries',{
      controller:'othersGalleriesCtrl',
      templateUrl:'ui/views/othersGalleries.html',
      scope:{}
    }).
    when('/about',{
     controller:'aboutCtrl',
     templateUrl:'ui/views/about.html',
     scope:{}
    }).
    when('/login', {
      controller: 'LoginController',
      templateUrl: 'ui/views/login.view.html',
      controllerAs: 'vm'
    })

    .when('/register', {
      controller: 'RegisterController',
      templateUrl: 'ui/views/register.view.html',
      controllerAs: 'vm'
    }).
    otherwise({redirectTo: '/home'});
  }]);
})();