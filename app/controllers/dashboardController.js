var dashboardController = riskManagementSystem.controller("dashboardController", ["$scope", "AppService", "rmsService", '$http', '$location', function($scope, AppService, rmsService, $http, $location) {
    
    
    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.authorizedUser=rmsService.decryptToken();
    $scope.loggedInUser = rmsService.getLoggedInUser();
    //$scope.role = $scope.loggedInUser.roles[0];
    $scope.thisView = "dashboard";
    $scope.logOutUser=rmsService.logOutUser;
    $scope.lookUp = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/user-lookup',
            method: "GET",
            headers: { 'X-AUTH-TOKEN': $scope.token },
        }
        AppService.ShowLoader();
        var loginPromise = $http(req);
        loginPromise.then(function(response) {
            $scope.data = response.data;
            AppService.HideLoader();

            $location.path("/dashboard")
        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.logOut = function() {
        AppService.ShowLoader();
        localStorage.removeItem("rmsAuthToken");
        AppService.HideLoader();
        $location.path("/login");
    }
    $scope.changeMenu = function() {

            $scope.thisView = $event.target.id;
        }
        // $scope.lookUp();
}])