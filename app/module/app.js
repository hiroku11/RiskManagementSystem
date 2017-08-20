var riskManagementSystem = angular.module("riskManagementSystem", ['ngRoute']);
riskManagementSystem.config(['$routeProvider', '$locationProvider', '$compileProvider', function ($routeProvider, $locationProvider, $compileProvider, $httpProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    $routeProvider.
      when('/index.html', {
          templateUrl: 'app/views/login.html',
          controller: 'loginController',
      }).when('/login', {
          templateUrl: 'app/views/login.html',
          controller: 'loginController',
      }).when('/', {
          templateUrl: 'app/views/login.html',
          controller: 'loginController',
      }).when('/dashboard', {
          templateUrl: 'app/views/dashboard.html',
          controller: 'dashboardController',
          resolve: {
              loggedIn: function (rmsService,$location) {
                  //if user is not logged in redirect to login page
                  if (!rmsService.loggedInUser) {
                      $location.path("/login")
                  }
              }
          }
      })
}]);

riskManagementSystem.service("rmsService", function ($http,$window) {
    this.loggedInUser=null;
})