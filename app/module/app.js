var riskManagementSystem = angular.module("riskManagementSystem", ['ngRoute','btorfs.multiselect']);
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
      }).when('/incidents', {
          templateUrl: 'app/views/incidents.html',
          controller: 'incidentsController',
      }).when('/addincident', {
        templateUrl: 'app/views/addincident.html',
        controller: 'addIncidentController',
    })
}]);

