var incidentsController = riskManagementSystem.controller("incidentsController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http', function($scope, AppService, rmsService, $location, $window, $http) {

    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.thisView = "incidents";
    $scope.authorizedUser = rmsService.decryptToken();
    $scope.loggedInUser = rmsService.getLoggedInUser();

    $scope.logOutUser = rmsService.logOutUser;
    $scope.entry = [{ value: 10 }, { value: 20 }, { value: 50 }]


    $scope.getData = function(params) {
        // var filter = JSON.parse(params)
        var req = {
            url: 'https://108296e7.ngrok.io//rmsrest/s/search-incident',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token,

                'Search': JSON.stringify(params)
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
                "field": "uniqueIncidentId",
                "operator": $scope.idOp,
                "value": $scope.IncidentId

            },
            {
                "field": "openedDateTime",
                "operator": $scope.opendateop,
                "value": $scope.IncOpenedDate + " " + "00:00:00"

            },
            {
                "field": "closedDateTime ",
                "operator": $scope.closedateop,
                "value": $scope.IncClosedDate + " " + "00:00:00"

            },
            {
                "field": "incidentStatus ",
                "operator": "EQ",
                "value": $scope.IncidentStatus

            },
            {
                "field": "personInjured ",
                "operator": "EQ",
                "value": $scope.personInjured

            },
            {
                "field": "propertyDamage ",
                "operator": "EQ",
                "value": $scope.propertyDamage

            },
            {
                "field": "crimeInvolved ",
                "operator": "EQ",
                "value": $scope.crimeInvolved

            },
            {
                "field": "typeCode ",
                "operator": "EQ",
                "value": $scope.SincidentType

            },
            {
                "field": "categoryCode ",
                "operator": "EQ",
                "value": $scope.SIncidentCat

            },
            {
                "field": "locationCode ",
                "operator": "EQ",
                "value": $scope.SincidentLoc

            },

        ]
        $scope.getData(filters);
    }
    $scope.changePage = function() {

    }
    $scope.getIncidentType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/incident-type/incident-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.incidentType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getIncidentCategory = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/incident-category/incident-categories',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.incidentCategory = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getIncidentLoc = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/incident-location/incident-locations',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.incidentLoc = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getIncidentLocDetail = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/incident-location-detail/incident-location/' + $scope.SincidentLoc,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.incidentLocDetail = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
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
        //auto populate DDL
    $scope.getIncidentType();
    $scope.getIncidentCategory();
    $scope.getIncidentLoc();
    $scope.loadAPI = function() {
        AppService.ShowLoader();

        AppService.HideLoader();
    }


}]);