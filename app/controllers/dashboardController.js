var dashboardController = riskManagementSystem.controller("dashboardController", ["$scope", "AppService", "rmsService", '$http', '$location', function ($scope, AppService, rmsService, $http, $location) {


    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.authorizedUser = rmsService.decryptToken();
    $scope.loggedInUser = rmsService.getLoggedInUser();
    //$scope.role = $scope.loggedInUser.roles[0];
    $scope.thisView = "dashboard";
    $scope.logOutUser = rmsService.logOutUser;
    $scope.isAdminRole = rmsService.isAdminRole()
    if (!$scope.isAdminRole ) {
        $location.path("/incidents");
    }
    $scope.getIncidentReportCount = function () {
        var req = {
            url: 'https://b2897cdb.ngrok.io/rmsrest/s/admin/admin-dashboard-hdr-stat',
            method: "GET",
            headers: { 'X-AUTH-TOKEN': $scope.token },
        }
        AppService.ShowLoader();
        let promise = $http(req);
        promise.then(function (response) {
            $scope.incidentReportCount = response.data;
            AppService.HideLoader();
        }, function (error) {
            AppService.HideLoader();
        })
    }

    $scope.getDashboardIncidentVolumeByStatus = function(){
        var req = {
            url: 'https://b2897cdb.ngrok.io/rmsrest/s/admin/admin-dashboard-inc-volume-by-sts',
            method: "GET",
            headers: { 'X-AUTH-TOKEN': $scope.token },
        }
        AppService.ShowLoader();
        let promise = $http(req);
        promise.then(function (response) {
            $scope.incidentVolumeByStatus = response.data;
            $scope.setGraphMonths();
            console.log(response.data);
            $scope.createIncidentVolumeByStatusGraph();
            AppService.HideLoader();
        }, function (error) {
            AppService.HideLoader();
        })
    }

    $scope.setGraphMonths =function(){
        //assumption made that data will always be sorted for month and status both
        if(!$scope.volumeByStatusMonths){
            $scope.volumeByStatusMonths = [];
        }
        $scope.incidentVolumeByStatus.forEach((item) => {
            if($scope.volumeByStatusMonths.indexOf(item.monthYear) == -1){
                $scope.volumeByStatusMonths.push(item.monthYear);
            }
        });
    }

    $scope.groupDataForStatus =function(){
        let group = {};
        $scope.incidentVolumeByStatus.map( (item) => {
            if(!group[item.incidentStatus]){
                group[item.incidentStatus]={"name":item.incidentStatus,data:[]};
            }
            let indx = $scope.volumeByStatusMonths.indexOf(item.monthYear);
            group[item.incidentStatus]['data'][indx] =item.incidentCount;
           
        });

        let arr = [];
        for(let key in group){
            let groupLength = group[key]['data'].length;
            
            for (let ind = 0; ind < groupLength; ind++) {
                if(typeof group[key].data[ind] == 'undefined'){
                    group[key].data[ind] = 0;
                }
                
            }
            arr.push(group[key]);
        }
        return arr;
    }

    $scope.createIncidentVolumeByStatusGraph =function(){

        Highcharts.chart('incidentVolumeByStatusGraph', {
            
                title: {
                    text: 'Incident Volume by Status'
                },
            
                // subtitle: {
                //     text: 'Source: thesolarfoundation.com'
                // },
                credits: {
                    enabled: false
                },
                yAxis: {
                    title: {
                        text: 'Number of Incidents'
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                },   
                 xAxis: {
                    categories: $scope.volumeByStatusMonths,
            
                    labels: {
                        formatter: function () {
                            return  this.value
                        }
                    }
                },            
                series: $scope.groupDataForStatus(),
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            
            });
    }
    $scope.logOut = function () {
        AppService.ShowLoader();
        localStorage.removeItem("rmsAuthToken");
        AppService.HideLoader();
        $location.path("/login");
    }
    $scope.changeMenu = function () {
        $scope.thisView = $event.target.id;
    }

    $scope.getIncidentReportCount();
    $scope.getDashboardIncidentVolumeByStatus();
}])