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

    $scope.incident = {
        "incidentId": 24,
        "uniqueIncidentId": "",
        "incidentStatus": ""
    }
    $scope.logIncidentDetails = {
        "incidentId": null,
        "incidentOpenedDateTime": null,
        "uniqueIncidentId": null,
        "statusFlag": null,
        "propertyDamage": "Y",
        "criminalAttack": "",
        "accidentDamage": "",
        "vehicleOrAssetDamage": "",
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

    $scope.suspect = {
        addresses: [{
            "id": null,
            "statusFlag": "ACTIVE"
        }],

        distinguishingFeatureDetail: null,
        distinguishingFeature: null
    }
    $scope.witness = {
        addresses: [],
        distinguishingFeatureDetail: null,
        distinguishingFeature: null
    }
    $scope.assetWitness = {
        addresses: [],
        distinguishingFeatureDetail: null,
        distinguishingFeature: null
    }
    $scope.vehicle = {

        "assetCategory": {
            "id": "VEHICLE",
            "description": null
        }

    }
    $scope.equipment = {

        "assetCategory": {
            "id": "EQUIPMENT",
            "description": null
        }

    }
    $scope.building = {

        "assetCategory": {
            "id": "BUILDING",
            "description": null
        }

    }
    $scope.loss = {
        "id": null,
        "incident": {},
        "statusFlag": "ACTIVE"
    }
    $scope.incidentDetails = {
        "incidentId": 0,
        "uniqueIncidentId": "",
        "newSuspects": [

        ],
        "existingSuspects": [

        ],
        "employeeSuspects": [

        ],
        "reportedLosses": [

        ]
    }
    $scope.accidentDetails = {
        "incidentId": $scope.incident.incidentId,
        "uniqueIncidentId": $scope.incident.uniqueIncidentId,
        accident: {},
        newInjuredPersons: [],
        existingInjuredPersons: [],
        employeeInjuredPersons: [],
        newWitnesses: [],
        existingWitnesses: [],
        employeeWitnesses: []
    }
    $scope.injuredPerson = {
        addresses: [],
        distinguishingFeatureDetail: null,
        distinguishingFeature: null
    }
    $scope.assetDetail = {
        asset: {

        },
        newWitnesses: [],
        existingWitnesses: [],
        employeeWitnesses: [],
        buildings: [],
        equipments: [],
        vehicles: []

    }
    $scope.crimeDetails = {
        "crime": {
            "id": null,
            "incident": {},
            "statusFlag": null,
            "crimeDateTime": "",
            "crimeDescription": "",
            "anyWitness": ""
          },
          "incidentId": $scope.incident.incidentId,
          "uniqueIncidentId": $scope.incident.uniqueIncidentId,
        newWitnesses: [],
        existingWitnesses: [],
        employeeWitnesses: [],
        employeeCrimeSuspects: [],
        existingCrimeSuspects: [],
        newCrimeSuspects: []

    }
    $scope.crimeWitness = {
        addresses: [],
        distinguishingFeatureDetail: null,
        distinguishingFeature: null
    }

    $scope.crimeSuspect = {
        addresses: [],
        distinguishingFeatureDetail: null,
        distinguishingFeature: null
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

        if (formName == "incidentDetailsForm") {
            $scope.addIncidentDetails();
        }
        if (formName == "accidentForm") {
            $scope.addAccidentDetails();
        }
        if(formName=="crimeForm"){
            $scope.addCrimeDetails();
        }
        $(".content")[0].scrollTop = 0;
    }

    $scope.addSuspect = function() {
        $scope.incidentDetails.newSuspects.push($scope.suspect);
        //reinitialize the suspect so that new can be added
        $scope.suspect = {

            addresses: [{
                "id": null,
                "statusFlag": "ACTIVE"
            }]
        }

    }
    
    $scope.addEmployeeSuspect = function(person) {
        if (person.selected) {
            $scope.incidentDetails.employeeSuspects.push({ 'id': person.id });
        } else {
            $scope.incidentDetails.employeeSuspects.map(function(val, index) {
                // push({'id':person.id});
                if (val.id == person.id) {
                    $scope.incidentDetails.employeeSuspects.splice(index, 1);
                }
            })
        }
    }

    $scope.addExistingSuspect = function(person) {
        if (person.selected) {
            $scope.incidentDetails.existingSuspects.push({ 'id': person.id });
        } else {
            $scope.incidentDetails.existingSuspects.map(function(val, index) {
                // push({'id':person.id});
                if (val.id == person.id) {
                    $scope.incidentDetails.existingSuspects.splice(index, 1);
                }
            })
        }
    }




    $scope.addLoss = function() {
        $scope.loss.dateTimeContacted = $scope.loss.dateTimeContacted + " " + $scope.loss.timeHrsContacted + ":" + $scope.loss.timeMinContacted;
        delete $scope.loss.timeHrsContacted;
        delete $scope.loss.timeMinContacted;
        $scope.incidentDetails.reportedLosses.push($scope.loss);
        //reinitialize the loss so that new can be added
        $scope.loss = {
            "id": null,
            "incident": {},
            "statusFlag": "ACTIVE"
        }
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
                if ($scope.logIncidentDetails.accidentDamage) {
                    $scope.tabs.push({ "active": false, "description": "Accident", "name": "accidentForm", "tab": 3 });
                    return;
                } else {
                    $scope.tabs.splice(index, 1);
                    return;
                }

            }
            if (formName == "assetsForm") {
                if ($scope.logIncidentDetails.vehicleOrAssetDamage) {
                    $scope.tabs.push({ "active": false, "description": "Asset", "name": "assetsForm", "tab": 4 });
                    return;
                } else {
                    $scope.tabs.splice(index, 1);
                    return;
                }
            }
            if (formName == "crimeForm") {
                if ($scope.logIncidentDetails.criminalAttack) {
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
        $scope.logIncidentDetails.accidentDamage ? $scope.logIncidentDetails.accidentDamage = "Y" : $scope.logIncidentDetails.accidentDamage = "N";
        $scope.logIncidentDetails.vehicleOrAssetDamage ? $scope.logIncidentDetails.vehicleOrAssetDamage = "Y" : $scope.logIncidentDetails.vehicleOrAssetDamage = "N";
        $scope.logIncidentDetails.criminalAttack ? $scope.logIncidentDetails.criminalAttack = "Y" : $scope.logIncidentDetails.criminalAttack = "N";
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/incident/log-incident',
            method: "POST",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            data: $scope.logIncidentDetails
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            $scope.incidentSecond = response.data;
            $scope.incident.incidentStatus = response.data.incidentStatus;
            $scope.incident.incidentId=response.data.incidentId;
            $scope.incident.uniqueIncidentId=response.data.uniqueIncidentId;
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

    $scope.getDistinguishFeatures = function() {

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
            $scope.distinguishFeatures = response.data;
            // /debugger
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }


    $scope.getDistinguishFeaturesDetails = function() {
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/table-maintenance/distinguishing-feature-detail/distinguishing-feature-details',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {

            //change the options as required by the multiselect plugin/module
            $scope.distinguishFeaturesDetails = response.data;
            $scope.distinguishFeaturesDetailsOptions = $scope.distinguishFeaturesDetails;
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
            $scope.bodyPartsArray = storeDesc;
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
            $scope.injuredPersonTypes = response.data;
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
            $scope.injuryCauses = response.data;
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
            $scope.injuryTypes = response.data;
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
    $scope.getDistinguishFeatures();
    $scope.getDistinguishFeaturesDetails();
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
    $scope.getInjuryType();
    $scope.getInjuryCause();
    $scope.getLossType();
    $scope.getOrg();
    $scope.getPolicyType();
    $scope.getPos();
    $scope.getPosLevel();
    $scope.getVehicleDamageType();
    $scope.getWeaponType();

    $scope.addIncidentDetails = function() {
        debugger
        $scope.incidentDetails.incidentId = $scope.incident.incidentId;
        $scope.incidentDetails.uniqueIncidentId = $scope.incident.uniqueIncidentId;
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/incident/add-incident-details',
            method: "POST",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
            data: $scope.incidentDetails
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
           // $scope.incidentSecond = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.addCrimeDetails=function(){
        $scope.crimeDetails.crime.crimeDateTime = $scope.crimeDetails.crime.date + " " + $scope.crimeDetails.crime.timeHrs + ":" + $scope.crimeDetails.crime.timeMin;
        delete $scope.crimeDetails.crime.timeHrs;
        delete $scope.crimeDetails.crime.timeMin;
        delete $scope.crimeDetails.crime.date;
        $scope.crimeDetails.incidentId = $scope.incident.incidentId;
        $scope.crimeDetails.uniqueIncidentId = $scope.incident.uniqueIncidentId;

        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/incident/add-crime-details',
            method: "POST",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            data: $scope.crimeDetails
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            //$scope.incidentSecond = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.addInjuredPerson = function() {
        $scope.accidentDetails.newInjuredPersons.push($scope.injuredPerson);
        //reset the object
        $scope.injuredPerson = {
            addresses: []
        }
    }
    $scope.addEmployeeInjured = function(person) {
        if (person.selected) {
            $scope.accidentDetails.employeeInjuredPersons.push({ 'id': person.id });
        } else {
            $scope.accidentDetails.employeeInjuredPersons.map(function(val, index) {
                // push({'id':person.id});
                if (val.id == person.id) {
                    $scope.accidentDetails.employeeInjuredPersons.splice(index, 1);
                }
            })
        }
    }

    $scope.addExistingInjured = function(person) {
        if (person.selected) {
            $scope.accidentDetails.existingInjuredPersons.push({ 'id': person.id });
        } else {
            $scope.accidentDetails.existingInjuredPersons.map(function(val, index) {
                // push({'id':person.id});
                if (val.id == person.id) {
                    $scope.accidentDetails.existingInjuredPersons.splice(index, 1);
                }
            })
        }
    }

    $scope.addWitness = function() {
        $scope.accidentDetails.newWitnesses.push($scope.witness);
        //reset the object
        $scope.witness = {
            addresses: []
        }
    }

    $scope.addCrimeWitness = function() {
        $scope.crimeDetails.newWitnesses.push($scope.crimeWitness);
        //reset the object
        $scope.crimeWitness = {
            addresses: [],
            distinguishingFeatureDetail: null,
            distinguishingFeature: null
        }
    }

    $scope.addCrimeSuspect=function(){
        $scope.crimeDetails.newCrimeSuspects.push($scope.crimeSuspect);
        $scope.crimeSuspect = {
            addresses: [],
            distinguishingFeatureDetail: null,
            distinguishingFeature: null
        }
    }
    $scope.addEmployeeWitness = function(person) {
        if (person.selected) {
            $scope.accidentDetails.employeeWitnesses.push({ 'id': person.id });
        } else {
            $scope.accidentDetails.employeeWitnesses.map(function(val, index) {

                if (val.id == person.id) {
                    $scope.accidentDetails.employeeWitnesses.splice(index, 1);
                }
            })
        }
    }

    $scope.addExistingWitness = function(person) {
        if (person.selected) {
            $scope.accidentDetails.existingWitnesses.push({ 'id': person.id });
        } else {
            $scope.accidentDetails.existingWitnesses.map(function(val, index) {

                if (val.id == person.id) {
                    $scope.accidentDetails.existingWitnesses.splice(index, 1);
                }
            })
        }
    }
    $scope.addAssetWitness = function() {
        $scope.assetDetail.newWitnesses.push($scope.assetWitness);
        //reset the object
        $scope.assetWitness = {
            addresses: []
        }
    }
    $scope.addAssetEmployeeWitness = function(person) {
        if (person.selected) {
            $scope.assetdetail.employeeWitnesses.push({ 'id': person.id });
        } else {
            $scope.assetDetail.employeeWitnesses.map(function(val, index) {

                if (val.id == person.id) {
                    $scope.assetDetail.employeeWitnesses.splice(index, 1);
                }
            })
        }
    }

    $scope.addAssetExistingWitness = function(person) {
        if (person.selected) {
            $scope.assetDetail.existingWitnesses.push({ 'id': person.id });
        } else {
            $scope.assetDetail.existingWitnesses.map(function(val, index) {

                if (val.id == person.id) {
                    $scope.assetdetail.existingWitnesses.splice(index, 1);
                }
            })
        }
    }
    $scope.addBuilding = function() {
        $scope.assetDetail.buildings.push($scope.building);
        $scope.building = {};

    }
    $scope.addVehicle = function() {
        $scope.assetDetail.vehicles.push($scope.vehicle);
        $scope.vehicle = {};

    }
    $scope.addEquipement = function() {
        $scope.assetDetail.equipments.push($scope.equipment);
        $scope.equipment = {};


    }
    $scope.addAccidentDetails = function() {
        $scope.accidentDetails.incidentId = $scope.incident.incidentId;
        $scope.accidentDetails.uniqueIncidentId = $scope.incident.uniqueIncidentId;
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/incident/add-accident-details',
            method: "POST",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
            data: $scope.accidentDetails
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            //$scope.incidentSecond = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.userLookup = function(args) {
        $scope.userInfo = [];
        var fil = {
            "paging": { "currentPage": 0, "pageSize": 50 },
            "sorts": [{ "field": "firstName", "order": "ASC" }],
            "filters": [{

                "field": "fullName",
                "operator": "CONTAINS",
                "value": args

            }]
        }

        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/user-lookup',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token,
                'Search': JSON.stringify(fil)


            },
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {

            $scope.userInfo = response.data;

            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();


        })

    }

    $scope.suspectLookup = function(args) {

        var fil = {
            "paging": { "currentPage": 0, "pageSize": 50 },
            "sorts": [{ "field": "firstName", "order": "ASC" }],
            "filters": [{

                "field": "fullName",
                "operator": "CONTAINS",
                "value": args

            }]
        }
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/suspect-lookup',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token,
                'Search': JSON.stringify(fil)
            },
        }

        $http(req).then(function(response) {
            $scope.suspectData = response.data;
        }, function(error) {

        })

    }

    $scope.injuredPersonLookup = function(args) {

        var fil = {
            "paging": { "currentPage": 0, "pageSize": 50 },
            "sorts": [{ "field": "firstName", "order": "ASC" }],
            "filters": [{

                "field": "fullName",
                "operator": "CONTAINS",
                "value": args

            }]
        }
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/injured-person-lookup',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token,
                'Search': JSON.stringify(fil)
            },
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {

            $scope.injuredPersonData = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.witnessLookup = function(args) {

        var fil = {
            "paging": { "currentPage": 0, "pageSize": 50 },
            "sorts": [{ "field": "firstName", "order": "ASC" }],
            "filters": [{
                "field": "fullName",
                "operator": "CONTAINS",
                "value": args

            }]
        }
        var req = {
            url: 'https://108296e7.ngrok.io/rmsrest/s/witness-lookup',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token,
                'Search': JSON.stringify(fil)
            },
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {

            $scope.witnessData = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }




    $scope.logOutUser = rmsService.logOutUser;
    $scope.options = ['Scar', 'Balding', 'Glasses', 'Accent', 'Beard', 'Birth Mark', 'Mole', 'Squint'];

}])