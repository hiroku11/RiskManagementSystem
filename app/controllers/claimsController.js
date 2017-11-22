var claimsController = riskManagementSystem.controller("claimsController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http',"helperFunctions",
    function ($scope, AppService, rmsService, $location, $window, $http,helperFunctions) {

        $scope.token = localStorage.getItem('rmsAuthToken');
        $scope.thisView = "incidents";
        $scope.authorizedUser = rmsService.decryptToken();
        $scope.loggedInUser = rmsService.getLoggedInUser();
        // $scope.data = [];
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

    }]); 