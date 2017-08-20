var dashboardController = riskManagementSystem.controller("dashboardController", ["$scope", "rmsService", '$location', function ($scope, rmsService, $location) {
    $scope.loggedInUser = rmsService.loggedInUser;
    if (angular.isUndefined($scope.loggedInUser)) {
        $location.path()
    }
}])