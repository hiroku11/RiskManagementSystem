var incidentsController = riskManagementSystem.controller("incidentsController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http',"helperFunctions", function ($scope, AppService, rmsService, $location, $window, $http,helperFunctions) {

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


    $scope.getData = function (params) {
        // var filter = JSON.parse(params)
        var fil = {
            "paging": { "currentPage": 0, "pageSize": 50 },
            "sorts": [{ "field": "openedDateTime", "order": "ASC" }],
            "filters": params
        }
        var req = {
            url: 'https://b2897cdb.ngrok.io//rmsrest/s/search-incident',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token,

                'Search': JSON.stringify(fil)
            },


        }
        AppService.ShowLoader();
        var getIncident = $http(req);
        getIncident.then(function (response) {
            if (response.data.length != 0) {
                $scope.data = response.data;
            }




            AppService.HideLoader();


        }, function (error) {
            AppService.HideLoader();
        })
    }
    $scope.getData();
    //To clear search params
    $scope.clearSearchParams = function () {
        $scope.IncidentId = "";
        $scope.IncOpenedDate = "";
        $scope.idOp = "";
        $scope.opendateop = "";
        $scope.closedateop = "";
        $scope.IncClosedDate = "";
        $scope.IncidentStatus = "";

        $scope.SincidentType = "";
        $scope.SIncidentCat = "";
        $scope.SincidentLoc = "";
        $scope.SincidentLocDetail = "";
        $scope.prop = false;
        $scope.cAttack = false;
        $scope.Acc = false;
        $scope.Asset = false;
        $scope.user = "";
    }
    //declaring variables

    // $scope.


    $scope.advancedSearch = function () {
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
            "field": "locationDetailCode",
            "operator": "EQ",
            "value": $scope.SincidentLocDetail


        },

        {
            "field": "propertyDamage",
            "operator": "EQ",
            "value": $scope.prop == true ? 'Y' : 'N'


        },
        {
            "field": "criminalAttack",
            "operator": "EQ",
            "value": $scope.cAttack == true ? 'Y' : 'N'


        },
        {
            "field": "accidentDamage",
            "operator": "EQ",
            "value": $scope.Acc == true ? 'Y' : 'N'


        },
        {
            "field": "vehicleOrAssetDamage",
            "operator": "EQ",
            "value": $scope.Asset == true ? 'Y' : 'N'

        },
        {
            "field": "reportedBy",
            "operator": "EQ",
            "value": $scope.user

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

    $scope.getIncidentType = function () {
        var req = {
            url: 'https://b2897cdb.ngrok.io/rmsrest/s/table-maintenance/incident-type/incident-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
        }
        AppService.ShowLoader();

        $http(req).then(function (response) {
            $scope.incidentType = response.data;

            AppService.HideLoader();


        }, function (error) {
            AppService.HideLoader();
        })
    }
    $scope.getIncidentCategory = function () {
        var req = {
            url: 'https://b2897cdb.ngrok.io/rmsrest/s/table-maintenance/incident-category/incident-categories',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function (response) {
            $scope.incidentCategory = response.data;

            AppService.HideLoader();


        }, function (error) {
            AppService.HideLoader();
        })
    }
    $scope.getIncidentLoc = function () {
        var req = {
            url: 'https://b2897cdb.ngrok.io/rmsrest/s/table-maintenance/incident-location/incident-locations',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function (response) {
            $scope.incidentLoc = response.data;

            AppService.HideLoader();


        }, function (error) {
            AppService.HideLoader();
        })
    }
    $scope.getIncidentLocDetail = function () {
        var req = {
            url: 'https://b2897cdb.ngrok.io/rmsrest/s/table-maintenance/incident-location-detail/incident-location/' + $scope.SincidentLoc,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function (response) {
            $scope.incidentLocDetail = response.data;

            AppService.HideLoader();


        }, function (error) {
            AppService.HideLoader();
        })
    }
    $scope.getEntries = function () {
        var fil = {
            "paging": { "currentPage": 0, "pageSize": $scope.entryCount }
        }

        var req = {
            url: 'https://b2897cdb.ngrok.io/rmsrest/s/search-incident',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token,
                'Search': JSON.stringify(fil)


            },
        }
        AppService.ShowLoader();
        var getIncident = $http(req);
        getIncident.then(function (response) {
            $scope.data = response.data;
            AppService.HideLoader();
        });
    }
    //user lookup
    $scope.userLookup = function () {
        var fil = {
            "paging": { "currentPage": 0, "pageSize": 50 },
            "sorts": [{ "field": "firstName", "order": "ASC" }],
            "filters": [{

                "field": "fullName",
                "operator": "CONTAINS",
                "value": $scope.user

            }]
        }

        var req = {
            url: 'https://b2897cdb.ngrok.io/rmsrest/s/user-lookup',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token,
                'Search': JSON.stringify(fil)


            },
        }

        $http(req).then(function (response) {
            debugger
            $scope.userInfo = response.data;


        }, function (error) {

        })

    }
    //auto populate DDL
    $scope.getIncidentType();
    $scope.getIncidentCategory();
    $scope.getIncidentLoc();
    $scope.loadAPI = function () {
        AppService.ShowLoader();
        AppService.HideLoader();
    }


}]);