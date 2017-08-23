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

    riskManagementSystem.service("rmsService", function($http, $window) {
        this.loggedInUser = null;

    })

})();