var loginController = riskManagementSystem.controller("loginController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http', function($scope, AppService, rmsService, $location, $window, $http) {
    this.AppService = AppService;
    $scope.loginUser = function() {
        var req = {
            url: 'https://0ba0e9e1.ngrok.io/rmsrest/p/api/login',
            method: "POST",
            headers: { 'Authorization': 'Basic ' + $window.btoa(unescape(encodeURIComponent($scope.username + ':' + $scope.password))) },
        }
        AppService.ShowLoader();
        var loginPromise = $http(req);
        loginPromise.then(function(response) {
            rmsService.loggedInUser = response.data;
            var token = response.data.XAuthToken;
            localStorage.setItem("rmsAuthToken", token);
            AppService.HideLoader();
            if (!rmsService.isAdminRole()) {
                $location.path("/incidents")
            }
            $location.path("/dashboard")
        }, function(error) {
            //show user that credentials are not correct
            $scope.signInError = true;
            AppService.HideLoader();
        })
    }
}])