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
            $location.path("/login");
        }
    })




})();

// riskManagementSystem.directive('autoComplete', function($timeout) {
//     return function(scope, iElement, iAttrs) {
//         iElementautocomplete({
//             source: scope[iAttrs.uiItems],
//             select: function() {
//                 $timeout(function() {
//                     iElement.trigger('input');
//                 }, 0);
//             }
//         });
//     };
// });