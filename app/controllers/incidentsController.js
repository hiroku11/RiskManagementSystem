var incidentsController = riskManagementSystem.controller("incidentsController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http', function($scope, AppService, rmsService, $location, $window, $http) {

    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.thisView = "incidents";
    $scope.authorizedUser = rmsService.decryptToken();
    $scope.loggedInUser = rmsService.getLoggedInUser();
    $scope.data = [];

    $scope.logOutUser = rmsService.logOutUser;

    $scope.entry = [{ value: 10 }, { value: 20 }, { value: 50 }];
    //Change Date picker format

    $scope.getData = function(params) {
        // var filter = JSON.parse(params)
        var fil = {
            "paging": { "currentPage": 0, "pageSize": 50 },
            "sorts": [{ "field": "openedDateTime", "order": "ASC" }],
            "filters": params
        }
        var req = {
            url: 'https://108296e7.ngrok.io//rmsrest/s/search-incident',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token,

                'Search': JSON.stringify(fil)
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
    $scope.getData();
    //declaring variables
    // $scope.IncidentId = "";
    // $scope.IncOpenedDate = "";
    // $scope.idOp = "EQ";
    // $scope.opendateop = "LT";
    // $scope.closedateop = "LT";
    // $scope.IncClosedDate = "";
    // $scope.IncidentStatus = "";
    // $scope.personInjured = "";
    // $scope.propertyDamage = "";
    // $scope.crimeInvolved = "";
    // $scope.SincidentType = "";
    // $scope.SIncidentCat = "";
    // $scope.SIncidentLoc = "";
    // $scope.PROP_DMGE = false;
    // $scope.



    $scope.advancedSearch = function() {
        var params = [];
        var filters = [{
                "field": "uniqueIncidentId",
                "operator": $scope.idOp,
                "value": $scope.IncidentId

            },
            {
                "field": "openedDateTime",
                "operator": $scope.opendateop,
                "value": $scope.IncOpenedDate ? $scope.IncOpenedDate + " " + "00:00:00" : undefined

            },
            {
                "field": "closedDateTime",
                "operator": $scope.closedateop,
                "value": $scope.IncClosedDate ? $scope.IncClosedDate + " " + "00:00:00" : undefined

            },
            {
                "field": "incidentStatus",
                "operator": "EQ",
                "value": $scope.IncidentStatus

            },
            {
                "field": "personInjured",
                "operator": "EQ",
                "value": $scope.personInjured

            },


            {
                "field": "typeCode",
                "operator": "EQ",
                "value": $scope.SincidentType

            },

            {
                "field": "locationCode",
                "operator": "EQ",
                "value": $scope.SincidentLoc

            },

            {
                "field": "propertyDamage",
                "operator": "EQ",
                "value": $scope.prop == false ? 'N' : 'Y'


            },
            {
                "field": "criminalAttack",
                "operator": "EQ",
                "value": $scope.cAttack == false ? 'N' : 'Y'


            },
            {
                "field": "accidentDamage",
                "operator": "EQ",
                "value": $scope.Acc == false ? 'N' : 'Y'


            },
            {
                "field": "vehicleOrAssetDamage",
                "operator": "EQ",
                "value": $scope.Asset == false ? 'N' : 'Y'

            }


        ]


        // for (var i = 0; i < filters.length; i++) {
        //     if (filters[i].value != "" || filters[i].value != undefined) {
        //         params = filters.slice(i);
        //     }

        // }
        var params = filters.filter(checkParams);

        $scope.getData(params);
        $("#myModal").modal('hide');
    }

    function checkParams(param) {
        return param.value != "" && param.value != undefined;
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
            var fil = {
                "paging": { "currentPage": 0, "pageSize": $scope.entryCount }
            }

            var req = {
                url: 'https://108296e7.ngrok.io/rmsrest/s/search-incident',
                method: "GET",
                headers: {
                    'X-AUTH-TOKEN': $scope.token,
                    'Search': JSON.stringify(fil)


                },
            }
            AppService.ShowLoader();
            var getIncident = $http(req);
            getIncident.then(function(response) {
                $scope.data = response.data;
                AppService.HideLoader();
            });
        }
        //user lookup
    $scope.userLookup = function() {
            var fil = {
                "paging": { "currentPage": 0, "pageSize": 50 },
                "sorts": [{ "field": "firstName", "order": "ASC" }],
                "filters": [{

                    "field": "userLoginId",
                    "operator": "STARTS_WITH",
                    "value": $scope.user

                }]
            }
            var dataForAutocomplete = {}
            var req = {
                url: 'https://108296e7.ngrok.io/rmsrest/s/user-lookup',
                method: "GET",
                headers: {
                    'X-AUTH-TOKEN': $scope.token,



                },
            }
            AppService.ShowLoader();
            var getIncident = $http(req);
            getIncident.then(function(response) {
                $scope.userInfo = response.data;

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