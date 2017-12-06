(function() {
    'use strict';
    var AppService = angular.module('riskManagementSystem')
        .factory('AppService', function($rootScope, $http, $location, $timeout) {
            return {
                ShowLoader: function(message) {
                    (function() {
                        $rootScope.loaderVisibility = true;
                        $rootScope.loaderText = message;
                    })();
                },
                HideLoader: function() {
                    (function() {
                        $rootScope.loaderVisibility = false;
                    })();
                }
            };
        })

    riskManagementSystem.service("rmsService", function($http, $window, $location) {
        this.decryptToken = function() {
            if (this.authorisedUserDetails) {
                return this.authorisedUserDetails
            }
            //decrypt the authorization token.
            var token = localStorage.getItem("rmsAuthToken");
            if(!token){
                $location.path("/login");
                return;
            }
            var base64Url = token.split('.')[0];
            var decryptedUserDetails = JSON.parse(window.atob(base64Url));
            if (decryptedUserDetails) {
                this.authorisedUserDetails = decryptedUserDetails;
                //check if the token has expired
                if (new Date(decryptedUserDetails.expires) < new Date()) {
                    var expired = true;
                }
            } else {
                //if token not present redirect to login
                $location.path("/login");
            }

            if (!expired) {
                return this.authorisedUserDetails;
            } else {
                //if expired redirect to login
                $location.path("/login");
            }

        }
        this.baseEndpointUrl = "https://b2897cdb.ngrok.io/rmsrest/s/";
        this.getLoggedInUser = function() {
            if (this.loggedInUser) {
                return this.loggedInUser;
            } else {
                this.loggedInUser = {};
                this.getLoggedInUser.userId = this.authorisedUserDetails.loginId;
                this.loggedInUser.lastName = this.authorisedUserDetails.lastName;
                this.loggedInUser.firstName = this.authorisedUserDetails.firstName;
                this.loggedInUser.roles = this.authorisedUserDetails.roles.map(function(item) {
                    return item.roleName;
                });
                return this.loggedInUser;
            }
        }
        this.logOutUser = function() {
            localStorage.removeItem("rmsAuthToken");
            this.authorisedUserDetails = null;
            $location.path("/login");
        }
        this.isAdminRole = function(){
            let adminRoles = ['INVESTIGATOR', 'CLAIMS_HANDLER', 'ADMIN'];
            return  adminRoles.some(role => this.loggedInUser.roles.includes(role));
        }
        this.cloneObject = function(obj){
            return JSON.parse(JSON.stringify(obj));
        }
        
    })
    
    riskManagementSystem.service("helperFunctions",function(){
        this.range = function (count,itemPerPage) {
            count = count / itemPerPage;
            var ranges = [];
            for (var i = 0; i < count; i++) {
                ranges.push(i + 1)
            }
            return ranges;
        }
    })




})();

