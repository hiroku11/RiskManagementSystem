var investigationsController = riskManagementSystem.controller("investigationsController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http', "helperFunctions",
function ($scope, AppService, rmsService, $location, $window, $http, helperFunctions) {

    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.thisView = "investigations";
    $scope.authorizedUser = rmsService.decryptToken();
    $scope.loggedInUser = rmsService.getLoggedInUser();
    // $scope.data = [];
    $scope.isAdminRole = rmsService.isAdminRole()
    if (!$scope.isAdminRole) {
        $location.path("/incidents");
    }
    $scope.currentPage = 1;
    $scope.entryCount = 10;
    $scope.logOutUser = rmsService.logOutUser;
    $scope.Math = window.Math;
    $scope.entry = [{ value: 10 }, { value: 20 }, { value: 50 }];

    $scope.sortBy = "uniqueIncidentId";
    $scope.reverse = false;

    //pagination functions starts
    $scope.changeSortBy = function (sortBy) {
        if ($scope.sortBy == sortBy) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.sortBy = sortBy;
            $scope.reverse = false;
        }
    }

    $scope.range = helperFunctions.range;
    $scope.goToPage = function (pageNo) {
        if (pageNo < 1 || pageNo > Math.ceil($scope.data.length / $scope.entryCount)) return;
        $scope.currentPage = pageNo;
    }
    //pagination functions ends

    $scope.getInvestigations = function () {
        var req = {
            url: rmsService.baseEndpointUrl+"investigation/investigatorLoginId/" +$scope.authorizedUser.loginId,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token,
            },
        }
        AppService.ShowLoader();
        let promise = $http(req);
        promise.then(function (response) {
            $scope.data = response.data;
            AppService.HideLoader();
        }, function (error) {
            AppService.HideLoader();
        })
    }
    $scope.getInvestigations();
}]); 