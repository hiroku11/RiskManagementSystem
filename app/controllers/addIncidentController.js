var addIncidentController = riskManagementSystem.controller("addIncidentController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http', function($scope, AppService, rmsService, $location, $window, $http) {
    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.thisView = "incidents";
    $scope.tab = "1";
    $scope.authorizedUser = rmsService.decryptToken();
    $scope.loggedInUser = rmsService.getLoggedInUser();
    $scope.logOutUser = rmsService.logOutUser;
    $scope.options = ['Scar', 'Balding', 'Glasses', 'Accent', 'Beard', 'Birth Mark', 'Mole', 'Squint'];
    $scope.incidentType = {};
    $scope.incidentLoc = {};
    $scope.entryPoint = {};
    $scope.features = {};
    $scope.agencies = {};
    $scope.suspectType = {};
    $scope.accidentLoc = {};
    $scope.changeTab = function(tab) {
        $scope.tab = tab;
        $(".content")[0].scrollTop = 0;
    }
    $scope.getIncidentLocations = function() {
        var req = {
            method: "GET",
            url: "https://108296e7.ngrok.io/rmsrest/s/table-maintenance/accident-location/accident-locations",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            }
        }
        $http(req).then(function(response) {
            //getting the incident locations from backend
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
        var getIncident = $http(req);
        getIncident.then(function(response) {
            $scope.suspectType = response.data;
            console.log($scope.suspectType);
            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
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
        // var getIncident = $http(req);
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
    $scope.getAccidentLoc = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/accident-location/accident-locations',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.accidentLoc = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getAccidentType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/accident-type/accident-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.accidentType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getAssetCategory = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/asset-category/asset-categories',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.assetCat = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getBodyPart = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/body-part/body-parts',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.bodyPart = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getClaimRegType = function() {
        var req = {
            url: '/rmsrest/s/table-maintenance/claim-request-registration-type/claim-request-registration-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.claimReg = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getClaimStatus = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/claim-status/claim-statuses',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.claimStatus = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getClaimType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/claim-type/claim-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.claimType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getDepartment = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/department/departments',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.depType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getDocCategory = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/document-category/document-categories',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.docCategory = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getDocType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/document-type/document-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.docType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getEmpType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/employee-type/employee-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.empType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getEventType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/event-type/event-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.eventType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getGenderType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/gender-type/gender-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.genderType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getInjuredPersonType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/injured-person-type/injured-person-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.injuredPersonType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getInjuryCause = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/injury-cause/injury-causes',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.injuryCause = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getInjuryType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/injury-type/injury-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.injuryType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getLossType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/loss-type/loss-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.lossType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getOrg = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/organization/organizations',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.organization = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getPolicyType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/policy-type/policy-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.policyType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getPos = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/position/positions',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.position = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getPosLevel = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/position-level/position-levels',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.positionLevel = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getVehicleDamageType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/vehicle-damage-type/vehicle-damage-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.vehDamageType = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getWeaponType = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/weapon-type/weapon-types',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.weaponType = response.data;

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
    $scope.getSuspectType();
    $scope.getAccidentLoc();
    $scope.getAccidentType();
    $scope.getAssetCategory();
    $scope.getBodyPart();
    $scope.getClaimRegType();
    $scope.getClaimStatus();
    $scope.getClaimType();
    $scope.getDepartment();
    $scope.getDocCategory();
    $scope.getDocType();
    $scope.getEmpType();
    $scope.getEventType();
    $scope.getGenderType();
    $scope.getInjuredPersonType();
    $scope.getInjuryCause();
    $scope.getLossType();
    $scope.getOrg();
    $scope.getPolicyType();
    $scope.getPos();
    $scope.getPosLevel();
    $scope.getVehicleDamageType();
    $scope.getWeaponType();
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
    $scope.logOutUser=rmsService.logOutUser;
$scope.options=['Scar','Balding','Glasses','Accent','Beard','Birth Mark','Mole','Squint']

    
}])