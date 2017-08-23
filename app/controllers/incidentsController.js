var incidentsController = riskManagementSystem.controller("incidentsController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http', function($scope, AppService, rmsService, $location, $window, $http) {
    $scope.loggedInUser = rmsService.loggedInUser;
    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.thisView = "incidents";
    if (angular.isUndefined($scope.loggedInUser)) {
        $location.path("/")
    }
    $scope.getData = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/incident/incidents',
            method: "GET",
            headers: { 'X-AUTH-TOKEN': $scope.token },
        }
        AppService.ShowLoader();
        var loginPromise = $http(req);
        loginPromise.then(function(response) {
            $scope.data = response.data;
            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getData();
}])