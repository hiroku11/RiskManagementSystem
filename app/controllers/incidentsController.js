var incidentsController = riskManagementSystem.controller("incidentsController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http', function ($scope, AppService, rmsService, $location, $window, $http) {
    $scope.loggedInUser = rmsService.loggedInUser;
    $scope.token = localStorage.getItem('rmsAuthToken');
    if (angular.isUndefined($scope.loggedInUser)) {
        $location.path("/")
    }
}])