var addIncidentDetailController = riskManagementSystem.controller("addIncidentDetailController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http', function($scope, AppService, rmsService, $location, $window, $http) {
    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.thisView = "incidents";
    $scope.tab = "1";
    $scope.authorizedUser = rmsService.decryptToken();
    $scope.loggedInUser = rmsService.getLoggedInUser();
    $scope.logOutUser = rmsService.logOutUser;
    // $scope.features = ['Scar', 'Balding', 'Glasses', 'Accent', 'Beard', 'Birth Mark', 'Mole', 'Squint']

    $scope.changeTab = function(tab) {
            $scope.tab = tab;
            $(".content")[0].scrollTop = 0;
        }
        //Variables to store drop down values
    $scope.incidentType = {};
    $scope.incidentLoc = {};
    $scope.entryPoint = {};
    $scope.features = {};
    $scope.agencies = {};
    $scope.suspectType = {};

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
    $scope.getEntrypoint = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/entry-point/entry-points',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.entryPoint = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getFeatures = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/distinguishing-feature/distinguishing-features',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.features = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getAgency = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/external-agency/external-agencies',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.agencies = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getSuspectType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/suspect-type/suspect-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.suspectType = response.data;
            console.log($scope.suspectType);
            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getSuspectType();
    $scope.getAgency();
    $scope.getFeatures();
    $scope.getEntrypoint();
    $scope.getIncidentLoc();
    $scope.getIncidentType();

    //below function is not required as we are able ro get the location details in Locations api itself
    // $scope.getIncidentLocationsDetails=function(){
    //     var req={
    //         method:"GET",
    //         url:"https://108296e7.ngrok.io/rmsrest/s/table-maintenance/accident-location-detail/accident-locations-details",
    //         headers:{
    //             'X-AUTH-TOKEN':$scope.token 
    //         }
    //     }
    //     $http(req).then(function(response){
    //         debugger

    //     })
    // }
    ///rmsrest/s/table-maintenance/accident- type/accident-types

    $scope.getIncidentLocations();

}])