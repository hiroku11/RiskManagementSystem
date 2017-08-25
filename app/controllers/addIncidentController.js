var addIncidentController = riskManagementSystem.controller("addIncidentController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http', function($scope, AppService, rmsService, $location, $window, $http) {
    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.thisView = "incidents";
    $scope.tab="1";
    $scope.authorizedUser=rmsService.decryptToken();
    $scope.loggedInUser = rmsService.getLoggedInUser();
    $scope.logOutUser=rmsService.logOutUser;
$scope.options=['Scar','Balding','Glasses','Accent','Beard','Birth Mark','Mole','Squint']

    $scope.changeTab=function(tab){
        $scope.tab=tab;
        $(".content")[0].scrollTop=0;
    }
    $scope.getIncidentLocations=function(){
        var req={
            method:"GET",
            url:"https://108296e7.ngrok.io/rmsrest/s/table-maintenance/accident-location/accident-locations",
            headers:{
                'X-AUTH-TOKEN':$scope.token 
            }
        }
        $http(req).then(function(response){
            //getting the incident locations from backend
        })
    }

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