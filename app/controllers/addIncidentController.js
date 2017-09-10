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
    $scope.partsJson = [];
    $scope.incidentDetails = {
        "incidentId": null,
        "incidentOpenedDateTime": null,
        "uniqueIncidentId": null,
        "statusFlag": null,
        "propertyDamage": "Y",
        "criminalAttack": "Y",
        "accidentDamage": "Y",
        "vehicleOrAssetDamage": "N",
        "placeOfIncident": "",
        "landmark": "",
        "incidentDescription": "",
        "entryPoint": {
            "id": "",
            "description": null
        },
        "incidentStatus": null,
        "incidentLocation": {
            "id": "",
            "description": null
        },
        "incidentLocationDetail": {
            "id": "",
            "description": null
        },
        "incidentType": {
            "id": "",
            "description": null
        }
    }
    $scope.tabs = [{ "active": true, "description": "Log Incident", "name": "logIncidentForm", "tab": 1 },
        { "active": false, "description": "Incident Details", "name": "incidentDetailsForm", "tab": 2 },
        // { "active": false, "description": "Accident" ,"name":"accidentForm","tab":3},
        // { "active": false, "description": "Assets" ,"name":"assetsForm","tab":4},
        // { "active": false, "description": "Crime" ,"name":"crimeForm","tab":5},
        { "active": false, "description": "Claim", "name": "claimForm", "tab": 6 },
        { "active": false, "description": "Investigation", "name": "investigationForm", "tab": 7 },
        { "active": false, "description": "Supporting Documents", "name": "documentsForm", "tab": 8 }
    ];

    $scope.submitForm = function(formName, back) {
        var index = 0;
        $scope.tabs.sort(function(a, b) {
            return a.tab - b.tab;
        })
        $scope.tabs.filter(function(val, ind) {
            if (val.name == formName) {
                index = ind;
            }
        });
        if (back) {
            $scope.tabs[index].active = false;
            $scope.tabs[index - 1].active = true;
            $scope.tab = $scope.tabs[index - 1].tab;
        } else {
            $scope.tabs[index].active = false;
            $scope.tabs[index + 1].active = true;
            $scope.tab = $scope.tabs[index + 1].tab;
        }

        if ($scope.tab == 2) {
            $scope.logIncident();
        }
        $(".content")[0].scrollTop = 0;
    }

    $scope.addTab = function(formName) {
        var tabPresent = false;
        var index;
        $scope.tabs.filter(function(val, ind) {
            if (val.name == formName) {
                tabPresent = true;
                index = ind;
            }
        });

        if (!tabPresent) {
            if (formName == "accidentForm") {
                if ($scope.incident.incidentDetails.injuredPerson) {
                    $scope.tabs.push({ "active": false, "description": "Accident", "name": "accidentForm", "tab": 3 });
                    return;
                } else {
                    $scope.tabs.splice(index, 1);
                    return;
                }

            }
            if (formName == "assetsForm") {
                if ($scope.incident.incidentDetails.assetDamanged) {
                    $scope.tabs.push({ "active": false, "description": "Asset", "name": "assetsForm", "tab": 4 });
                    return;
                } else {
                    $scope.tabs.splice(index, 1);
                    return;
                }
            }
            if (formName == "crimeForm") {
                if ($scope.incident.incidentDetails.assetDamanged) {
                    $scope.tabs.push({ "active": false, "description": "Crime", "name": "crimeForm", "tab": 5 });
                    return;
                } else {
                    $scope.tabs.splice(index, 1);
                    return;
                }
            }
            return;
        }
        if (tabPresent) {
            $scope.tabs.splice(index, 1);
        }
    }
    $scope.getUserInfo = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/incident/add-incident',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.incident = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.getUserInfo();
    $scope.logIncident = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/incident/log-incident',
            method: "POST",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
            data: $scope.incidentDetails
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.incidentSecond = response.data;

            AppService.HideLoader();


        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.openBodyPartModal = function(sbodyPart) {
            // $("#bodyModal").modal('show');
            if (sbodyPart == 'Y') {
                $("#bodyModal").modal('show');
            }
        }
        // $scope.putImagePointer = function(partsSelected) {
        //     partsSelected.map(function(p) {
        //         ($scope.partsJson).map(function(d) {
        //             if (d[p] != undefined) {
        //                 d.p = true;
        //             }

    //         })
    //     })

    // }


    $scope.openMap = function() {
        $("#mapModal").modal('show');
        $('#mapModal').on('shown.bs.modal', function() {
            $scope.map = true;
            $scope.$apply();
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
            $scope.incidentLocations = response.data;

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
            //change the options as required by the multiselect plugin/module
            $scope.features = response.data.map(function(val, index) {
                return val.id;
            });

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
            var bodyPart = response.data;
            var storeDesc = [];
            bodyPart.map(function(d) {
                storeDesc.push(d.description);

            });
            $scope.$parent.bodyPart = storeDesc;

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

    $scope.logOutUser = rmsService.logOutUser;
    $scope.options = ['Scar', 'Balding', 'Glasses', 'Accent', 'Beard', 'Birth Mark', 'Mole', 'Squint']


}])