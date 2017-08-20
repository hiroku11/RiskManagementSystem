var loginController = riskManagementSystem.controller("loginController", ["$scope", "rmsService", '$location', function ($scope, rmsService, $location) {
    $scope.loginUser = function () {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/p/api/login',
            method: "POST",
            headers: { 'Authorization': 'Basic ' + $window.btoa(unescape(encodeURIComponent($scope.username + ':' +  $scope.password))) },
        }
        var loginPromise = $http(req);
        loginPromise.then(function (response) {
            rmsService.loggedInUser = response.data;
            //var head=response.headers();
            ////$localStorage.setItem("rmsAuthToken")
            //$location.path("/dashboard")
        }, function (error) {
            //show user that credentials are not correct
            $scope.signInError = true;
        })
    }
}])