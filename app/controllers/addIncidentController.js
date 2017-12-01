var addIncidentController = riskManagementSystem.controller("addIncidentController", ["$scope", "AppService", "rmsService", '$location', '$window', '$http','$state',
 function($scope, AppService, rmsService, $location, $window, $http,$state) {
    $scope.token = localStorage.getItem('rmsAuthToken');
    $scope.thisView = "incidents";
    $scope.authorizedUser = rmsService.decryptToken();
    $scope.loggedInUser = rmsService.getLoggedInUser();
    $scope.logOutUser = rmsService.logOutUser;
    $scope.isAdminRole = rmsService.isAdminRole()
    if (!$scope.isAdminRole ) {
        $location.path("/incidents");
    }
    
    $scope.options = ['Scar', 'Balding', 'Glasses', 'Accent', 'Beard', 'Birth Mark', 'Mole', 'Squint'];
    $scope.incidentType = {};
    $scope.incidentLoc = {};
    $scope.entryPoint = {};
    $scope.features = {};
    $scope.agencies = {};
    $scope.suspectType = {};
    $scope.accidentLoc = {};
    $scope.partsJson = [];
    $scope.Math = Math;
    $scope.incident = {
        "incidentId": "",
        "uniqueIncidentId": "",
        "incidentStatus": "",
        "supportingDocuments":[]
    }
    $scope.editsuspect = false;
    $scope.editLoss = false;
    $scope.accAdded = false;
    $scope.editInjured = false;
    $scope.editWitness = false;
    $scope.editequipment = false;
    $scope.editvehicle = false;
    $scope.editBuilding = false;

    if($state.params.uniqueIncidentId){
        $scope.incident.uniqueIncidentId = $state.params.uniqueIncidentId;
    }

    $scope.getData = function(params) {
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/' + $scope.incident.uniqueIncidentId,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
        }
        AppService.ShowLoader();
        var getIncident = $http(req);
        getIncident.then(function(response) {
            if (response.data.length != 0) {
                $scope.data = response.data;
            }
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }


    $scope.logIncidentDetails = {
        "incidentId": null,
        "incidentOpenedDateTime": null,
        "uniqueIncidentId": null,
        "statusFlag": null,
        "propertyDamage": "Y",
        "criminalAttack": "",
        "accidentDamage": "",
        "assetDamage": "",
        "placeOfIncident": "",

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

        distinguishingFeatureDetails: null,
        distinguishingFeature: null
    }

    $scope.suspects = [];
    $scope.witness = {
        addresses: [],
        distinguishingFeatureDetails: null,
        distinguishingFeature: null
    }
    $scope.witnesses = [];
    $scope.assetWitness = {
        addresses: [],
        distinguishingFeatureDetails: null,
        distinguishingFeature: null
    }
    $scope.vehicle = {

        "assetCategory": {
            "id": "VEHICLE",
            "description": null
        }

    }
    $scope.vehicles=[];
    $scope.equipment = {

        "assetCategory": {
            "id": "EQUIPMENT",
            "description": null
        }

    }
    $scope.equipments=[];
    $scope.building = {

        "assetCategory": {
            "id": "BUILDING",
            "description": null
        }

    }
    $scope.buildings = [];
    $scope.loss = {
        "id": null,
        "incident": {},
        "statusFlag": "ACTIVE",
        "date": null,
        "timeHrsContacted": null,
        "timeMinContacted": null


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
        incident:{},
        id:null
        // "incidentId": $scope.incident.incidentId,
        // "uniqueIncidentId": $scope.incident.uniqueIncidentId,
        //accident: {},
        // newInjuredPersons: [],
        // existingInjuredPersons: [],
        // employeeInjuredPersons: [],
        // newWitnesses: [],
        // existingWitnesses: [],
        // employeeWitnesses: []
    }
    
    $scope.assetDetail = {
        
        
       
             "id": null,
             "incident": {},
             "statementDescription": null,
             "otherDescription": null,
             "statusFlag": null,
             "assetCategory": {
                 "id": null,
                 "description": null
             }
       
     }
     $scope.claimDetail = {
         "id":null,
         "incident":{},
         "statusFlag": null,
         "claimType":{
             "id":null
         },
        "policyType":{
            "id":null
        } 


     }
    $scope.investigationDetails = {
        "incidentId": "",
        "uniqueIncidentId": "",
        "investigation": {
            "id": null,
            "incident": null,
            "statusFlag": null,
            "securityRequested": "",
            "trainingRequested": "",
            "reviewedInvestigationRecords": "",
            "reviewedCCTV": "",
            "reviewedPictures": "",
            "reviewedWitnessStatement": "",
            "reviewedLearnerRecords": "",
            "reviewedAssetRecords": "",
            "reviewedComplianceRecords": "",
            "investigator": {},
            "investigatorStatement": ""
        }
    }

    $scope.injuredPerson = {
        addresses: [],
        bodyParts: [],
        distinguishingFeatureDetails: null,
        distinguishingFeature: null,

    }

    $scope.injuredPersons = [];
    $scope.partsSelected = [];

    $scope.getSupportingDocuments =function(){
        //get all documnets

        $scope.supportingDocumentsFormData.append("uniqueIncidentId", $scope.incident.uniqueIncidentId);
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/document/documents-for-incident/' + $scope.incident.uniqueIncidentId,
            method: "POST",
            headers: {
                'X-AUTH-TOKEN': $scope.token,
            },
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {
            AppService.HideLoader();
            $scope.incident.supportingDocuments = response.data;
        }, function(error) {
            AppService.HideLoader();
        })
    }
    //  $scope.myObj = {$scope.injuredPerson.bodyParts : []}

    //Click event
    // $scope.changeBodyPart = function(args) {
    //     var flag = false;
    //     if ($scope.injuredPerson.bodyParts == undefined) {
    //         $scope.injuredPerson.bodyParts = [];
    //     }
    //     // $scope.partsSelected = $scope.injuredPerson.bodyParts;
    //     if ($scope.injuredPerson.bodyParts.length != 0) {
    //         for (var i = 0; i < $scope.injuredPerson.bodyParts.length; i++) {
    //             if ($scope.injuredPerson.bodyParts[i] == args) {
    //                 $scope.injuredPerson.bodyParts.splice(i, 1);
    //                 flag = true;
    //                 break;
    //             }
    //         }

    //     }
    //     if (flag == false) {
    //         $scope.injuredPerson.bodyParts.push(args);

    //     }
    //     $scope.$apply();
    // }
    var temp = [];
    $scope.myObj = { temp: [] };
    $scope.changeBodyPart = function(args) {
        var flag = false;
        if ($scope.injuredPerson.bodyParts == undefined) {
            $scope.injuredPerson.bodyParts = [];
        }
        // $scope.partsSelected = $scope.injuredPerson.bodyParts;
        if ($scope.injuredPerson.bodyParts.length != 0) {
            for (var i = 0; i < $scope.injuredPerson.bodyParts.length; i++) {
                if ($scope.injuredPerson.bodyParts[i] == args) {
                    $scope.injuredPerson.bodyParts.splice(i, 1);
                    flag = true;
                    break;
                }
            }

        }
        if (flag == false) {

            // var args = {
            //     "id": $scope.bodyPartsArray.map(function(d) {
            //         if (d == args) return d;
            //     }),
            //     "description": args
            // }
            $scope.injuredPerson.bodyParts.push(args);

        }


        $scope.myObj = { temp: $scope.injuredPerson.bodyParts }
    }

    $scope.Crimesuspects = [];
    $scope.crimeDetails = {
        "crime": {
            "id": null,
            "incident": {},
            "statusFlag": null,
            "crimeDateTime": null,
            "crimeDescription": null,
            "anyWitness": null
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
        distinguishingFeatureDetails: null,
        distinguishingFeature: null
    }

    $scope.crimeSuspect = {
        addresses: [],
        distinguishingFeatureDetails: null,
        distinguishingFeature: null
    }
    $scope.tabs = [{ "active": true, "description": "Log Incident", "name": "logIncidentForm", "tab": 1 },
        { "active": false, "description": "Incident Details", "name": "incidentDetailsForm", "tab": 2 },
        // { "active": false, "description": "Accident" ,"name":"accidentForm","tab":3},
        // { "active": false, "description": "Assets" ,"name":"assetsForm","tab":4},
        // { "active": false, "description": "Crime" ,"name":"crimeForm","tab":5},
        //{ "active": false, "description": "Claim", "name": "claimForm", "tab": 6 },
        //{ "active": false, "description": "Investigation", "name": "investigationForm", "tab": 7 },
        { "active": false, "description": "Supporting Documents", "name": "supportingDocumentsForm", "tab": 8 },
        { "active": false, "description": "Summary", "name": "summaryForm", "tab": 9 }
    ];

    $scope.changeTab = function(tab){
        //naviigate through tabs as well
        $scope.activeTab.active = false;
        $scope.activeTab = tab;
        $scope.activeTab.active = true;
    }

    $scope.supportingDocuments = [{}, {}, {}, {}, {}];
    $scope.activeTab = { "active": true, "description": "Log Incident", "name": "logIncidentForm", "tab": 1 };
   // $scope.activeTab = { "active": true, "description": "Summary", "name": "summaryForm", "tab": 9 };
    $scope.calendar = {
        open:function($event,which){
            $event.preventDefault();
            $scope.calendar.opened[which]=true;
        },
        opened: {

        }
    };
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
                if ($scope.logIncidentDetails.assetDamage) {
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
            if (formName == "claimForm") {
                $scope.tabs.push({ "active": false, "description": "Claim", "name": "claimForm", "tab": 6 });
                return;

            }
            if (formName == "investigationForm") {
                $scope.tabs.push({ "active": false, "description": "Investigation", "name": "investigationForm", "tab": 7 });
                return;
            }
            return;
            //{ "active": false, "description": "Claim", "name": "claimForm", "tab": 6 },
            //{ "active": false, "description": "Investigation", "name": "investigationForm", "tab": 7 },  
        }
        if (tabPresent) {
            $scope.tabs.splice(index, 1);
        }
    }
    $scope.handleTabsForRoles = function() {
        if ($scope.loggedInUser.roles.indexOf('INVESTIGATOR') > -1 ||
            $scope.loggedInUser.roles.indexOf('CLAIMS_HANDLER') > -1 ||
            $scope.loggedInUser.roles.indexOf('ADMIN') > -1) {
            $scope.addTab('investigationForm');
            $scope.addTab('claimForm');
        }
    }
    $scope.handleTabsForRoles();
    $scope.initializeAccidentPlaceAndTime = function() {
        $scope.accidentDetails.accidentPlace = $scope.logIncidentDetails.placeOfIncident
        $scope.accidentDetails.accidentTimeHrs = $scope.logIncidentDetails.timeHrsOfIncident;
        $scope.accidentDetails.accidentTimeMin = $scope.logIncidentDetails.timeMinOfIncident
    }

    $scope.getDayClass = function(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.inlineOptions = {
        customClass: $scope.getDayClass,
        showWeeks: true
    };

    $scope.dateOptions = {
        // dateDisabled: disabled,
        formatYear: 'yyyy',
        startingDay: 1
    };

    $scope.submitForm = function(formName, dir, $event) {
        var index = 0;
        //$scope.tabs[$scope.tab - 1].completed = true;

        $scope.tabs.filter(function(val, ind) {

            if (val.tab == $scope.activeTab.tab && dir != "back") {
                val.completed = true;
            }
            if (val.name == formName) {
                index = ind;
            }
        });
        $scope.tabs.sort(function(a, b) {
            return a.tab - b.tab;
        })

        if (dir == "back") {
            $scope.tabs[index].active = false;
            $scope.tabs[index - 1].active = true;
            //$scope.tab = $scope.tabs[index - 1].tab;
            $scope.activeTab = $scope.tabs[index - 1];
            $scope.getData();

        } else {
            if ($scope.activeTab.formAction == "saveContinue" || dir == "next") {

                $scope.tabs[index].active = false;
                $scope.tabs[index + 1].active = true;
                //$scope.tab = $scope.tabs[index + 1].tab;
                $scope.activeTab = $scope.tabs[index + 1];
            }
        }


        if (dir != "back" && dir != "next" && $scope.activeTab.completed != true || typeof dir == 'undefined') {
            if ($scope.activeTab.tab == 2) {
                $scope.logIncident();
            }

            if (formName == "incidentDetailsForm") {
               // $scope.addIncidentDetails();
            }
            if (formName == "accidentForm") {
                //$scope.addAccidentDetails();
            }
            if (formName == "assetsForm") {
                //$scope.addAssetDetails();
            }
            if (formName == "crimeForm") {
                $scope.addCrimeDetails();
            }
            if (formName == "investigationForm") {
                $scope.addInvestigationDetails();
            }
            if (formName == "supportingDocumentsForm") {

                $scope.addSupportingDocuments();
            }
        }

        $(".content")[0].scrollTop = 0;
        if ($scope.activeTab.tab == 3) {
            $scope.initializeAccidentPlaceAndTime();
        }
        // if($scope.activeTab.name == "supportingDocumentsForm"){
        //     $scope.getSupportingDocuments();
        // }

    }

    
    $scope.addSuspect = function() {
        //  $scope.incidentDetails.newSuspects.push($scope.suspect);
        // $scope.suspects.push($scope.suspect);
        $scope.suspect.distinguishingFeatureDetails = $scope.suspect.distinguishingFeatures;
        var req = {
          url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/add-suspect/uniqueIncidentId/' + $scope.incident.uniqueIncidentId,
          method: "PUT",
          headers: {
              'X-AUTH-TOKEN': $scope.token
          },
          data:$scope.suspect
      }
      AppService.ShowLoader();
  
      $http(req).then(function(response) {
          $scope.getSuspectData();
        
          AppService.HideLoader();
      }, function(error) {
          AppService.HideLoader();
      })
          //reinitialize the suspect so that new can be added
          $scope.suspect = {
  
              addresses: [{
                  "id": null,
                  "statusFlag": "ACTIVE"
              }]
          }
  
      }
      $scope.getSuspectData=function(){
          var req = {
              url: rmsService.baseEndpointUrl+'/rmsrest/s/suspect/suspect-table/uniqueIncidentId/' + $scope.incident.uniqueIncidentId,
              method: "GET",
              headers: {
                  'X-AUTH-TOKEN': $scope.token
              },
            
          }
          AppService.ShowLoader();
      
          $http(req).then(function(response) {
             
              $scope.suspects = response.data;
              AppService.HideLoader();
          }, function(error) {
              AppService.HideLoader();
          })
      }
 //Delete suspect data
 $scope.deleteSuspect = function(person) {
 
     if(person.suspectCategory == 'NON-EMPLOYEE'){
   
      var req = {
                url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/remove-suspect/uniqueIncidentId/'+$scope.incident.uniqueIncidentId+'/suspectId/' + person.id,
                method: "DELETE",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
               
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getSuspectData();
              
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })    
     }
     else{
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/remove-employee-suspect/uniqueIncidentId/'+$scope.incident.uniqueIncidentId+ '/employeeId/' + person.id,
            method: "DELETE",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
           
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
            $scope.getSuspectData();
          
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
     }
   
    
    // for (var i = 0; i < $scope.incidentDetails.existingSuspects.length && flag == false; i++) {
    //     if ($scope.incidentDetails.existingSuspects[i].id == person.id) {
    //         $scope.incidentDetails.existingSuspects.splice(i, 1);
    //         flag = true;
    //         break;
    //     }
    // }
    // for (var i = 0; i < $scope.incidentDetails.employeeSuspects.length && flag == false; i++) {
    //     if ($scope.incidentDetails.employeeSuspects[i].id == person.id) {
    //         $scope.incidentDetails.employeeSuspects.splice(i, 1);
    //         flag = true;
    //         break;
    //     }
    // }
    // for (var i = 0; i < $scope.incidentDetails.newSuspects.length && flag == false; i++) {
    //     if ($scope.incidentDetails.newSuspects[i].firstName == person.firstName &&
    //         $scope.incidentDetails.newSuspects[i].middleName == person.middleName) {
    //         $scope.incidentDetails.newSuspects.splice(i, 1);
    //         flag = true;
    //         break;
    //     }
    // }


    // $scope.suspects.map(function(val, index) {

    //     if (val.id == person.id) {
    //         $scope.suspects.splice(index, 1);

    //     }
    // })
    // person.selected = false;

}
$scope.loadSuspect = function(person){
      $scope.editsuspect = true;
      $scope.suspect = person;
    
}
//update existing suspect record
$scope.updateSuspect = function(person){

    $scope.editsuspect = false;
    var req = {
        url: rmsService.baseEndpointUrl+'/rmsrest/s/suspect/update-suspect/',
        method: "PUT",
        headers: {
            'X-AUTH-TOKEN': $scope.token
        },
        data:$scope.suspect
    }
    
    AppService.ShowLoader();

    $http(req).then(function(response) {
      
        $scope.getSuspectData();
        $scope.suspect.distinguishingFeatures = $scope.suspect.distinguishFeaturesDetails;
        AppService.HideLoader();
        
    }, function(error) {
        AppService.HideLoader();
    })
}
    $scope.addEmployeeSuspect = function(person) {
        if (person.selected) {
            var req = {
                url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/add-employee-suspect/uniqueIncidentId/'+$scope.incident.uniqueIncidentId+ '/employeeId/' + person.id,
                method: "PUT",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
                data:$scope.suspect
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getSuspectData();
              
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })
            // $scope.incidentDetails.employeeSuspects.push({ 'loginId': person.id });
            // $scope.suspects.push(person);

        } else {

            var req = {
                url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/remove-employee-suspect//uniqueIncidentId/'+$scope.incident.uniqueIncidentId+ '/employeeId/' + person.id,
                method: "DELETE",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
               
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getSuspectData();
              
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })
            // $scope.incidentDetails.employeeSuspects.map(function(val, index) {
             
            //     if (val.id == person.id) {
            //         $scope.incidentDetails.employeeSuspects.splice(index, 1);

            //     }
            // })
            // $scope.suspects.map(function(val, index) {

            //     if (val.id == person.id) {
            //         $scope.suspects.splice(index, 1);

            //     }
            // })
        }
    }

    $scope.addExistingSuspect = function(person) {
        if (person.selected) {
            var req = {
                url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/add-existing-suspect/uniqueIncidentId/'+$scope.incident.uniqueIncidentId+'/suspectId/' + person.id,
                method: "PUT",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
                data:$scope.suspect
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getSuspectData();
              
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })
               

            // $scope.incidentDetails.existingSuspects.push({ 'id': person.id });
            // $scope.suspects.push(person);

        } else {

            var req = {
                url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/remove-suspect/uniqueIncidentId/'+$scope.incident.uniqueIncidentId+'/suspectId/' + person.id,
                method: "DELETE",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
               
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getSuspectData();
              
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })
            // $scope.incidentDetails.existingSuspects.map(function(val, index) {
            //     // push({'id':person.id});
            //     if (val.id == person.id) {
            //         $scope.incidentDetails.existingSuspects.splice(index, 1);
            //     }
            // })

            // $scope.suspects.map(function(val, index) {

            //     if (val.id == person.id) {
            //         $scope.suspects.splice(index, 1);

            //     }
            // })
        }
    }

    $scope.addLoss = function(loss) {
        if ($scope.loss.date == null) {
            $scope.loss.dateTimeContacted = $scope.loss.date;
        } else {
            $scope.loss.dateTimeContacted = $scope.loss.date + " " + $scope.loss.timeHrsContacted + ":" + $scope.loss.timeMinContacted;
        }
        $scope.loss.incident ={
            id: $scope.incident.incidentId
        }

        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/reported-loss/create-reported-loss',
            method: "POST",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            data:$scope.loss
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
            $scope.getLossData();
          
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
        
        delete $scope.loss.timeHrsContacted;
        delete $scope.loss.timeMinContacted;
        
        //$scope.incidentDetails.reportedLosses.push($scope.loss);
        //reinitialize the loss so that new can be added
        $scope.loss = {
            "id": null,
            "incident": {},
            "statusFlag": "ACTIVE",
            "date": null,
            "timeHrsContacted": null,
            "timeMinContacted": null

        }
    }

    $scope.getLossData = function(){
       
        var req = {
            url: rmsService.baseEndpointUrl + '/rmsrest/s/reported-loss/reported-loss-table/incidentId/' + $scope.incident.incidentId,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
          
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
           
            $scope.incidentDetails.reportedLosses = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.loadLossData = function(loss){
        $scope.editLoss = true;
        $scope.loss = loss;
       
    }
       //delete loss data from table
    $scope.deleteLoss = function(loss) {

        var req = {
            url: rmsService.baseEndpointUrl + '/rmsrest/s/reported-loss/delete-reported-loss/reportedLossId/'+ loss.id,
            method: "DELETE",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
            $scope.getLossData();
          
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })    
       


    }
   
   
    $scope.updateLoss= function(){
       $scope.editLoss = false;
       var req = {
        url: rmsService.baseEndpointUrl+'/rmsrest/s/reported-loss/update-reported-loss',
        method: "PUT",
        headers: {
            'X-AUTH-TOKEN': $scope.token
        },
        data: $scope.loss
    }
    AppService.ShowLoader();

    $http(req).then(function(response) {
        $scope.getLossData();
      
        AppService.HideLoader();
    }, function(error) {
        AppService.HideLoader();
    })
    delete $scope.loss.timeHrsContacted;
    delete $scope.loss.timeMinContacted;
    
    //$scope.incidentDetails.reportedLosses.push($scope.loss);
    //reinitialize the loss so that new can be added
    $scope.loss = {
        "id": null,
        "incident": {},
        "statusFlag": "ACTIVE",
        "date": null,
        "timeHrsContacted": null,
        "timeMinContacted": null
    }
    
    }
    $scope.addAccident = function(){
        $scope.accAdded = true;
        if ($scope.accidentDetails.accidentDate == null) {
            $scope.accidentDetails.accidentDateTime = $scope.accidentDetails.accidentDate;
        } else {
            $scope.accidentDetails.accidentDateTime = $scope.accidentDetails.accidentDate + " " + $scope.accidentDetails.accidentTimeHrs + ":" + $scope.accidentDetails.accidentTimeMin;
        }
        $scope.accidentDetails.incident ={
            id: $scope.incident.incidentId
        }
       
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/accident/add-or-update-accident',
            method: "POST",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            data:$scope.accidentDetails
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
           AppService.HideLoader();
           $scope.accidentDetails.id = response.data.id;
        }, function(error) {
            AppService.HideLoader();
        })
        
    }
    
    $scope.selectSupportingDocumnet = function(doc, $event) {
        if (!$scope.supportingDocumentsFormData) {
            $scope.supportingDocumentsFormData = new FormData();
        }
        //$scope.supportingDocumentsFormData.append("uniqueIncidentId",$scope.incident.uniqueIncidentId);
        //let fileName = $event.target.files[0].name;
        $scope.supportingDocumentsFormData.append("file", $event.target.files[0]);
        $scope.supportingDocumentsFormData.append("fileDescription", doc.description);
    }

    $scope.addSupportingDocuments = function() {
        if (typeof $scope.supportingDocumentsFormData === 'undefined') {
            return;
        }
        $scope.supportingDocumentsFormData.append("uniqueIncidentId", $scope.incident.uniqueIncidentId);
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/document/save-documents',
            method: "POST",
            headers: {
                'X-AUTH-TOKEN': $scope.token,
                'Content-Type': undefined
            },
            data: $scope.supportingDocumentsFormData
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {
            AppService.HideLoader();
            $scope.incident.supportingDocuments = response.data;
        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getUserInfo = function() {
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/add-incident',
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
        $scope.logIncidentDetails.dateOfIncident = $scope.logIncidentDetails.date + " " + $scope.logIncidentDetails.timeHrsContacted + ":" + $scope.logIncidentDetails.timeMinContacted;

        $scope.logIncidentDetails.accidentDamage ? $scope.logIncidentDetails.accidentDamage = "Y" : $scope.logIncidentDetails.accidentDamage = "N";
        $scope.logIncidentDetails.assetDamage ? $scope.logIncidentDetails.assetDamage = "Y" : $scope.logIncidentDetails.assetDamage = "N";
        $scope.logIncidentDetails.criminalAttack ? $scope.logIncidentDetails.criminalAttack = "Y" : $scope.logIncidentDetails.criminalAttack = "N";
        $scope.incident.incidentStatus = 'DRAFT';
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/add-or-update-log-incident',
            method: "POST",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            data: $scope.logIncidentDetails
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            //$scope.incidentSecond = response.data;
            $scope.logIncidentDetails.incidentId = response.data.id;
            $scope.incident.incidentStatus = response.data.incidentStatus;
            $scope.incident.incidentId = response.data.id;
            $scope.incident.uniqueIncidentId = response.data.uniqueIncidentId;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }


    $scope.openBodyPartModal = function() {

        $("#bodyModal").modal('show');

    }

    $scope.removeFeatureToSelectedList= function(context){

        context.distinguishingFeatures.map((item) =>{
            context.distinguishingFeaturesOptions.splice(context.distinguishingFeaturesOptions.indexOf(item),1);
            if(item.parentId == context.distinguishingFeature[0].id){
                $scope.distinguishFeaturesDetails.push(item);
            }
            
        });
        context.distinguishingFeatures = context.distinguishingFeaturesOptions;
        $scope.distinguishFeaturesDetails.sort((a,b)=> {
            if (a.description < b.description)
              return -1;
            if (a.description > b.description)
              return 1;
            return 0;
          });
    }
    $scope.addFeatureToSelectedList = function(context){
        if(context.distinguishingFeatureDetail){
        //shal delete context.distinguishingFeaturesOptions && distinguishingFeatureDetail distinguishingFeature properties when sending request to backend
        if(!context.distinguishingFeaturesOptions){
            context.distinguishingFeaturesOptions = [];
            context.distinguishingFeatures = [];
        }
        context.distinguishingFeatureDetail.map(item => {
                if(context.distinguishingFeaturesOptions.indexOf(item) == -1){
                    context.distinguishingFeaturesOptions.push(item);
                    context.distinguishingFeatures = context.distinguishingFeaturesOptions;
                }
            });
            context.distinguishingFeatures.map((item,index)=> {
                $scope.distinguishFeaturesDetails.map((element,index) =>{
                    if(item.id == element.id)
                        $scope.distinguishFeaturesDetails.splice(index,1);
                });
                //$scope.distinguishFeaturesDetails.splice( $scope.distinguishFeaturesDetails.indexOf(item),1)
            })
        
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/suspect-type/suspect-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/incident-type/incident-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/incident-location/incident-locations',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/entry-point/entry-points',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/distinguishing-feature/distinguishing-features',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {
            //change the options as required by the multiselect plugin/module
            $scope.distinguishFeatures = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }


    $scope.getDistinguishFeaturesDetails = function(feature) {
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/distinguishing-feature-detail/distinguishing-feature/' + feature[0].id,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {
            //change the options as required by the multiselect plugin/module
            $scope.distinguishFeaturesDetails = response.data;
            $scope.distinguishFeaturesDetails.map((item)=>{
                item.parentId = feature[0].id;
            })
            $scope.distinguishFeaturesDetailsOptions = $scope.distinguishFeaturesDetails;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getAgency = function() {

        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/external-agency/external-agencies',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/accident-location/accident-locations',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/accident-type/accident-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/asset-category/asset-categories',
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
    var bodyPart = [];
    $scope.getBodyPart = function() {
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/body-part/body-parts',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            bodyPart = response.data;
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/claim-request-registration-type/claim-request-registration-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/claim-status/claim-statuses',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/claim-type/claim-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/department/departments',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/document-category/document-categories',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/document-type/document-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/employee-type/employee-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/event-type/event-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/gender-type/gender-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/injured-person-type/injured-person-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/injury-cause/injury-causes',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/injury-type/injury-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/loss-type/loss-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/organization/organizations',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/policy-type/policy-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/position/positions',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/position-level/position-levels',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/vehicle-damage-type/vehicle-damage-types',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/table-maintenance/weapon-type/weapon-types',
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
    //$scope.getDistinguishFeaturesDetails();
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

        $scope.incidentDetails.incidentId = $scope.incident.incidentId;
        $scope.incidentDetails.uniqueIncidentId = $scope.incident.uniqueIncidentId;
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/add-incident-details',
            method: "POST",
            headers: {
                'X-AUTH-TOKEN': $scope.token

            },
            data: $scope.incidentDetails
        }
        AppService.ShowLoader();

        $http(req).then(function(response) {
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.addCrimeDetails = function() {

        $scope.crimeDetails.crime.crimeDateTime = $scope.crimeDetails.crime.date + " " + $scope.crimeDetails.crime.timeHrs + ":" + $scope.crimeDetails.crime.timeMin;
        delete $scope.crimeDetails.crime.timeHrs;
        delete $scope.crimeDetails.crime.timeMin;
        delete $scope.crimeDetails.crime.date;
        $scope.crimeDetails.incidentId = $scope.incident.incidentId;
        $scope.crimeDetails.uniqueIncidentId = $scope.incident.uniqueIncidentId;

        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/add-crime-details',
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
       // $scope.accidentDetails.newInjuredPersons.push($scope.injuredPerson);
       // $scope.injuredPersons.push($scope.injuredPerson);
        //reset the object
        // $scope.injuredPerson = {
        //     addresses: [],
        //     bodyParts: [],
        // }

        // $scope.myObj = { temp: [] };


        $scope.injuredPerson.distinguishingFeatureDetails = $scope.injuredPerson.distinguishingFeatures;
        $scope.myObj.temp.map(function(d){
            bodyPart.map(function(i){
                if(i.description == d){
                    var part = {
                        id: i.id,
                        description : d
                    }
                    $scope.injuredPerson.bodyParts.push(part);
                 
                }
               
            })
            
        })
        var req = {
          url: rmsService.baseEndpointUrl+'/rmsrest/s/accident/add-injured-person/accidentId/' + $scope.accidentDetails.id,
          method: "PUT",
          headers: {
              'X-AUTH-TOKEN': $scope.token
          },
          data:$scope.injuredPerson
      }
      AppService.ShowLoader();
  
      $http(req).then(function(response) {
          $scope.getInjuredData();
        
          AppService.HideLoader();
      }, function(error) {
          AppService.HideLoader();
      })
          //reinitialize the injured person so that new can be added
          $scope.injuredPerson = {
            addresses: [],
            bodyParts: [],
            distinguishingFeatureDetails: null,
            distinguishingFeature: null,
    
        }
        $scope.myObj = { temp: [] };
    
  

    }
    $scope.getInjuredData=function(){
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/injured-person/injured-person-table/accidentId/'+ $scope.accidentDetails.id,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
          
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
           
            $scope.injuredPersons = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }

    
    $scope.addEmployeeInjured = function(person) {
        if (person.selected) {
            var req = {
                url: rmsService.baseEndpointUrl+
                '/rmsrest/s/accident/add-employee-injured-person/accidentId/'+
                $scope.accidentDetails.id+ '/employeeId/' + person.id,
                method: "PUT",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
             
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getInjuredData();
              
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })
        
        } else {

            var req = {
                url: rmsService.baseEndpointUrl+
                '/rmsrest/s/accident/remove-employee-injured-person/accidentId/'+
                $scope.accidentDetails.id+ '/employeeId/' + person.id,
                method: "DELETE",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
               
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getInjuredData();
              
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })
          
        }
    }

    $scope.addExistingInjured = function(person) {
        if (person.selected) {
            var req = {
                url: rmsService.baseEndpointUrl+
                '/rmsrest/s/accident/add-existing-injured-person/accidentId/'+
                $scope.accidentDetails.id+ '/injuredPersonId/' + person.id,
                method: "PUT",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
             
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getInjuredData();
              
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })
        
        } else {

            var req = {
                url: rmsService.baseEndpointUrl+
                '/rmsrest/s/accident/remove-injured-person/accidentId/'+
                $scope.accidentDetails.id+ '/injuredPersonId/' + person.id,
                method: "DELETE",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
               
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getInjuredData();
              
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })
          
        }
        }
         //Delete Injured person data
    $scope.deleteInjured = function(person) {
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/accident/remove-injured-person/accidentId/'+
            $scope.accidentDetails.id+ '/injuredPersonId/' + person.id,
            method: "DELETE",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
          
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
            $scope.getInjuredData();
          
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
      
    }
    $scope.loadInjured = function(person){
        $scope.editInjured = true;
        $scope.injuredPerson = person;
      
  }
  //update existing suspect record
  $scope.updateInjured = function(person){
  
      $scope.editInjured = false;
      var req = {
          url: rmsService.baseEndpointUrl+
          '/rmsrest/s/injured-person/update-injured-person/',
          method: "PUT",
          headers: {
              'X-AUTH-TOKEN': $scope.token
          },
          data:$scope.injuredPerson
      }
      
      AppService.ShowLoader();
  
      $http(req).then(function(response) {
        
          $scope.getInjuredData();
          $scope.injuredPerson.distinguishingFeatures = $scope.injuredPerson.distinguishFeaturesDetails;
          AppService.HideLoader();
          
      }, function(error) {
          AppService.HideLoader();
      })
  }
    //Witness 
    $scope.addWitness = function() {
        $scope.witness.distinguishingFeatureDetails = $scope.witness.distinguishingFeatures;
     
        var req = {
          url: rmsService.baseEndpointUrl+
          '/rmsrest/s/accident/add-witness/accidentId/' 
          + $scope.accidentDetails.id,
          method: "PUT",
          headers: {
              'X-AUTH-TOKEN': $scope.token
          },
          data:$scope.witness
      }
      AppService.ShowLoader();
  
      $http(req).then(function(response) {
          $scope.getWitnessData();
        
          AppService.HideLoader();
      }, function(error) {
          AppService.HideLoader();
      })
         
        
        // $scope.accidentDetails.newWitnesses.push($scope.witness);
        // $scope.witnesses.push($scope.witness);
        //reset the object
        $scope.witness = {
            addresses: [],
            distinguishingFeatureDetails: null,
            distinguishingFeature: null
        }

    }
    $scope.getWitnessData = function(){
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/witness/witness-table/accidentId/'+
             $scope.accidentDetails.id,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
          
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
           
            $scope.witnesses = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.addEmployeeWitness = function(person) {
        if (person.selected) {
            var req = {
                url: rmsService.baseEndpointUrl+
                '/rmsrest/s/accident/add-employee-witness/accidentId/'+
                $scope.accidentDetails.id+ '/employeeId/' + person.id,
                method: "PUT",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
             
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getWitnessData();
               
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })
        
        } else {

            var req = {
                url: rmsService.baseEndpointUrl+
                '/rmsrest/s/accident/remove-employee-witness/accidentId/'+
                $scope.accidentDetails.id+ '/employeeId/' + person.id,
                method: "DELETE",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
                data:$scope.suspect
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getWitnessData();
              
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })
          
        }
    }
    //delete witness
    $scope.deleteWitness = function(person) {
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/accident/remove-witness/accidentId/'+
            $scope.accidentDetails.id+ '/witnessId/' + person.id,
            method: "DELETE",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
            $scope.getWitnessData();
          
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    
    }
    $scope.loadWitness= function(person){
        $scope.editWitness = true;
        $scope.witness = person
    }
    $scope.updateWitness = function(person){
        
            $scope.editWitness = false;
            var req = {
                url: rmsService.baseEndpointUrl+
                '/rmsrest/s/witness/update-witness/',
                method: "PUT",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
                data:$scope.witness
            }
            
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
              
                $scope.getWitnessData();
                $scope.witness.distinguishingFeatures = $scope.witness.distinguishFeaturesDetails;
                AppService.HideLoader();
                
            }, function(error) {
                AppService.HideLoader();
            })
        }


    $scope.addExistingWitness = function(person) {
        if (person.selected) {
            var req = {
                url: rmsService.baseEndpointUrl+
                '/rmsrest/s/accident/add-existing-witness/accidentId/'+
                $scope.accidentDetails.id+ '/witnessId/' + person.id,
                method: "PUT",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
             
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getWitnessData();
                $scope.witness.distinguishingFeatures = $scope.witness.distinguishFeaturesDetails;
                
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })
        
        } else {

            var req = {
                url: rmsService.baseEndpointUrl+
                '/rmsrest/s/accident/remove-witness/accidentId/'+
                $scope.accidentDetails.id+ '/witnessId/' + person.id,
                method: "DELETE",
                headers: {
                    'X-AUTH-TOKEN': $scope.token
                },
                
            }
            AppService.ShowLoader();
        
            $http(req).then(function(response) {
                $scope.getWitnessData();
                $scope.witness.distinguishingFeatures = $scope.witness.distinguishFeaturesDetails;
                
                AppService.HideLoader();
            }, function(error) {
                AppService.HideLoader();
            })
          
        }
    }
    $scope.addAssetDetails = function() {
               $scope.assetDetail.incident.id = $scope.incident.incidentId 
                var req = {
                    url: rmsService.baseEndpointUrl+'/rmsrest/s/asset/add-or-update-asset',
                    method: "POST",
                    headers: {
                        'X-AUTH-TOKEN': $scope.token
                    },
                    data: $scope.assetDetail
                }
                AppService.ShowLoader();
        
                $http(req).then(function(response) {
                   $scope.assetDetail.id = response.data.id;
                    AppService.HideLoader();
                }, function(error) {
                    AppService.HideLoader();
                })
            }
    $scope.addBuilding = function() {
           var req = {
             url: rmsService.baseEndpointUrl+
             '/rmsrest/s/asset/add-building/assetId/' 
             + $scope.assetDetail.id,
             method: "PUT",
             headers: {
                 'X-AUTH-TOKEN': $scope.token
             },
             data:$scope.building
         }
         AppService.ShowLoader();
     
         $http(req).then(function(response) {
             $scope.getBuilding();
           
             AppService.HideLoader();
         }, function(error) {
             AppService.HideLoader();
         })
            
           
          
        $scope.building = {};

    }
    $scope.getBuilding = function(){
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/building/building-table/assetId/' 
            + $scope.assetDetail.id,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
           
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
           $scope.buildings = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.deleteBuiding = function(building){
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/asset/remove-building/assetId/'+
            $scope.assetDetail.id+ '/buildingId/' + building.id,
            method: "DELETE",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
          
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
            $scope.getBuilding();
          
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.loadBuilding = function(data){
        $scope.editBuilding = true;
        $scope.building = data;

    }
    $scope.updateBuilding = function(){
       $scope.editBuilding = false;
       var req = {
        url: rmsService.baseEndpointUrl+
        '/rmsrest/s/building/update-building/',
        method: "PUT",
        headers: {
            'X-AUTH-TOKEN': $scope.token
        },
        data:$scope.building
    }
    
    AppService.ShowLoader();

    $http(req).then(function(response) {
      
        $scope.getBuilding();
            AppService.HideLoader();
        
    }, function(error) {
        AppService.HideLoader();
    })
    }
    $scope.addVehicle = function() {
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/asset/add-vehicle/' 
            + $scope.assetDetail.id,
            method: "PUT",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            data:$scope.vehicle
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
            $scope.getVehicle();
          
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
           
          
         
     
        $scope.vehicle = {};

    }
    $scope.loadVehicle = function(data){
        $scope.editvehicle = true;
        $scope.vehicle= data;
    }
    $scope.getVehicle = function(){
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/vehicle/vehicle-table/assetId/' 
            + $scope.assetDetail.id,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
           
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
           $scope.vehicles = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.deleteVehicle = function(data){
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/asset/remove-vehicle/assetId/'+
            $scope.assetDetail.id+ '/vehicleId/' + building.id,
            method: "DELETE",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
          
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
            $scope.getVehicle();
          
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })   
    }
    $scope.updateVehicle = function(){
        $scope.editvehicle = false;
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/vehicle/update-vehicle/',
            method: "PUT",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            data:$scope.vehicle
        }
        
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
          
            $scope.getVehicle();
                AppService.HideLoader();
            
        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.addEquipement = function() {
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/asset/add-equipment/assetId/' 
            + $scope.assetDetail.id,
            method: "PUT",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            data:$scope.equipment
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
            $scope.getEquipment();
          
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
       
        $scope.equipment = {};


    }
    $scope.loadEquipment=function(data){
        $scope.editequipment = true;
        $scope.equipment = data;
    }
    $scope.getEquipment = function(){
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/equipment/equipment-table/assetId/' 
            + $scope.assetDetail.id,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
           
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
           $scope.equipments = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.updateEquipment = function(){
        $scope.editequipment = false;
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/equipment/update-equipment/',
            method: "PUT",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            data:$scope.equipment
        }
        
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
          
            $scope.getEquipment();
                AppService.HideLoader();
            
        }, function(error) {
            AppService.HideLoader();
        })
    }
    $scope.deleteEquipment = function(data){
        var req = {
            url: rmsService.baseEndpointUrl+
            '/rmsrest/s/asset/remove-equipment/assetId/'+
            $scope.assetDetail.id+ '/equipmentId/' + building.id,
            method: "DELETE",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
          
        }
        AppService.ShowLoader();
    
        $http(req).then(function(response) {
            $scope.getVehicle();
          
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })   
    }
     
        //Delete Crime suspect
    $scope.deleteCrimeSuspect = function(person) {
            var flag = false;

            for (var i = 0; i < $scope.crimeDetails.existingCrimeSuspects.length && flag == false; i++) {
                if ($scope.crimeDetails.existingCrimeSuspects[i].id == person.id) {
                    $scope.crimeDetails.existingCrimeSuspects.splice(i, 1);
                    flag = true;
                    break;
                }
            }
            for (var i = 0; i < $scope.crimeDetails.employeeCrimeSuspects.length && flag == false; i++) {
                if ($scope.crimeDetails.employeeCrimeSuspects[i].id == person.id) {
                    $scope.crimeDetails.employeeCrimeSuspects.splice(i, 1);
                    flag = true;
                    break;
                }
            }
            for (var i = 0; i < $scope.crimeDetails.newCrimeSuspects.length && flag == false; i++) {
                if ($scope.crimeDetails.newCrimeSuspects[i].firstName == person.firstName &&
                    $scope.crimeDetails.newCrimeSuspects[i].middleName == person.middleName) {
                    $scope.crimeDetails.newCrimeSuspects.splice(i, 1);
                    flag = true;
                    break;
                }
            }


            $scope.Crimesuspects.map(function(val, index) {

                if (val.id == person.id) {
                    $scope.Crimesuspects.splice(index, 1);

                }
            })
            person.selected = false;

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

    $scope.addCrimeSuspect = function() {

        $scope.crimeDetails.newCrimeSuspects.push($scope.crimeSuspect);
        $scope.Crimesuspects.push($scope.crimeSuspect)
        $scope.crimeSuspect = {
            addresses: [],
            distinguishingFeatureDetail: null,
            distinguishingFeature: null
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
            $scope.assetdetail.employeeWitnesses.push({ 'loginId': person.id });
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
    $scope.addCrimeEmployeeSuspect = function(person) {
        if (person.selected) {
            $scope.crimeDetails.employeeCrimeSuspects.push({ 'loginId': person.id });
            $scope.Crimesuspects.push(person);
        } else {
            $scope.crimeDetails.employeeCrimeSuspects.map(function(val, index) {

                if (val.id == person.id) {
                    $scope.crimeDetails.employeeCrimeSuspects.splice(index, 1);
                }
            })
            $scope.Crimesuspects.map(function(val, index) {

                if (val.id == person.id) {
                    $scope.Crimesuspects.splice(index, 1);

                }
            })
        }
    }
    $scope.addCrimeExistingSuspect = function(person) {
        if (person.selected) {
            $scope.crimeDetails.existingCrimeSuspects.push({ 'id': person.id });
            $scope.Crimesuspects.push(person);
        } else {
            $scope.crimeDetails.existingCrimeSuspects.map(function(val, index) {

                if (val.id == person.id) {
                    $scope.crimeDetails.existingCrimeSuspects.splice(index, 1);
                }
            })
            $scope.Crimesuspects.map(function(val, index) {

                if (val.id == person.id) {
                    $scope.Crimesuspects.splice(index, 1);

                }
            })
        }
    }
    $scope.addCrimeEmployeeWitness = function(person) {
        if (person.selected) {
            $scope.crimeDetails.employeeWitnesses.push({ 'loginId': person.id });
        } else {
            $scope.crimeDetails.employeeWitnesses.map(function(val, index) {

                if (val.id == person.id) {
                    $scope.crimeDetails.employeeWitnesses.splice(index, 1);
                }
            })
        }
    }

    $scope.addCrimeExistingWitness = function(person) {
        if (person.selected) {
            $scope.crimeDetails.existingWitnesses.push({ 'id': person.id });
        } else {
            $scope.crimeDetails.existingWitnesses.map(function(val, index) {

                if (val.id == person.id) {
                    $scope.crimeDetails.existingWitnesses.splice(index, 1);
                }
            })
        }
    }
  
    $scope.addAccidentDetails = function() {
        $scope.accidentDetails.incidentId = $scope.incident.incidentId;
        $scope.accidentDetails.uniqueIncidentId = $scope.incident.uniqueIncidentId;
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/add-accident-details',
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
    $scope.clearUser = function() {
        $scope.userInfo = [];
    }
    $scope.userLookup = function(args) {

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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/user-lookup',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/suspect-lookup',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/injured-person-lookup',
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/witness-lookup',
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
    $scope.crimeSuspectLookup = function(args) {
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
            url: rmsService.baseEndpointUrl+'/rmsrest/s/crime-suspect-lookup',
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token,
                'Search': JSON.stringify(fil)
            },
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {

            $scope.crimeSuspectData = response.data;
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.addInvestigationDetails = function() {
        $scope.investigationDetails.incidentId = $scope.incident.incidentId;
        $scope.investigationDetails.uniqueIncidentId = $scope.incident.uniqueIncidentId;
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/add-investigation-details',
            method: "POST",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            data: $scope.investigationDetails
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {
            AppService.HideLoader();
        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.removeSupportingDocumnet = function(doc,index){
        var req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/document/delete-document/'+doc.id,
            method: "DELETE",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            }
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {
            AppService.HideLoader();
            $scope.incident.supportingDocuments.splice(index,1);
            
        }, function(error) {
            AppService.HideLoader();
        })
        
    }

    $scope.downloadSupportingDocumnet=function(doc){
        let req = {
            url: rmsService.baseEndpointUrl+'/rmsrest/s/document/download-document/'+doc.id,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
            responseType: 'arraybuffer'
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {
            AppService.HideLoader();  
            let blob = new Blob([response.data], {type: doc.fileContentType});
            saveAs(blob, doc.originalFileName);
        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getincidentSummary = function(){
        ///rmsrest/s/incident/uniqueIncidentId/IN010917203918
        let req = {
            //url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/uniqueIncidentId/IN011117154413',
            url: rmsService.baseEndpointUrl+'/rmsrest/s/incident/uniqueIncidentId/' + $scope.incident.uniqueIncidentId,
            method: "GET",
            headers: {
                'X-AUTH-TOKEN': $scope.token
            },
        }
        AppService.ShowLoader();
        $http(req).then(function(response) {
          $scope.incidentSummary = response.data;
          console.log(response.data);
        }, function(error) {
            AppService.HideLoader();
        })
    }

    $scope.getincidentSummary();
    $scope.logOutUser = rmsService.logOutUser;
    $scope.options = ['Scar', 'Balding', 'Glasses', 'Accent', 'Beard', 'Birth Mark', 'Mole', 'Squint'];

}])


