var addIncidentController = riskManagementSystem.controller("addIncidentController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http', function($scope, AppService, rmsService, $location, $window, $http) {
    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.thisView = "incidents";
    $scope.tab="1";
    $scope.authorizedUser=rmsService.decryptToken();
    $scope.loggedInUser = rmsService.getLoggedInUser();

}])