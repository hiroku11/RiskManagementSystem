var incidentsController = riskManagementSystem.controller("incidentsController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http', function($scope, AppService, rmsService, $location, $window, $http) {

    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.thisView = "incidents";
    $scope.authorizedUser = rmsService.decryptToken();
    $scope.loggedInUser = rmsService.getLoggedInUser();
    if (angular.isUndefined($scope.loggedInUser)) {
        $location.path("/")
    }
    $scope.getData = function(params) {
        var req = {
            url: 'https://108296e7.ngrok.io//rmsrest/s/search-incident',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

                // 'filters': params
            },
        }
        AppService.ShowLoader();
        var getIncident = $http(req);
        getIncident.then(function(response) {
            $scope.data = response.data;
            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getData('');

    $scope.advancedSearch = function() {
        var filters = [{
                "field": "id",
                "operator": "EQ",
                "value": $scope.IncidentId

            },
            {
                "field": "personInjured",
                "operator": "EQ",
                "value": $scope.InjuredPerson

            },
            {
                "field": "organizationCode ",
                "operator": "EQ",
                "value": $scope.Organisation

            },
            {
                "field": "departmentCode ",
                "operator": "EQ",
                "value": $scope.Dep

            },
            {
                "field": "locationCode ",
                "operator": "EQ",
                "value": $scope.Loc

            },

        ]
        $scope.getData(filters);
    }
    $scope.changePage = function() {

    }
    $scope.getEntries = function() {
        alert($scope.entryCount);
        var req = {
            url: 'https://108296e7.ngrok.io//rmsrest/s/search-incident',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token,

                'paging': {
                    "currentPage": 0,
                    "pageSize": $scope.entryCount
                },

            },
        }
        AppService.ShowLoader();
        var getIncident = $http(req);
        getIncident.then(function(response) {
            $scope.data = response.data;
            AppService.HideLoader();
        });
    }

}]);