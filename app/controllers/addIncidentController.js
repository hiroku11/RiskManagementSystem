var addIncidentController = riskManagementSystem.controller("addIncidentController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http', function($scope, AppService, rmsService, $location, $window, $http) {
    $scope.loggedInUser = rmsService.loggedInUser;
    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.thisView = "incidents";
    if (angular.isUndefined($scope.loggedInUser)) {
        $location.path("/")
    }

}])