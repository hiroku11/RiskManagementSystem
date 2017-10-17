var riskManagementSystem = angular.module("riskManagementSystem", ['ui.router', 'btorfs.multiselect', 'ui.bootstrap']);
riskManagementSystem.config(['$stateProvider', '$urlRouterProvider', '$compileProvider','$httpProvider', function($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    $urlRouterProvider.otherwise('/index.html');
    $stateProvider.
    state('home', {
        url:"/index.html",
        templateUrl: 'app/views/login.html',
        controller: 'loginController',
    }).state('login', {
        url:"/login",
        templateUrl: 'app/views/login.html',
        controller: 'loginController',
    }).state('dashboard', {
        url:"/dashboard",
        templateUrl: 'app/views/dashboard.html',
        controller: 'dashboardController',
    }).state('incidents', {
        url:"/incidents",
        templateUrl: 'app/views/incidents.html',
        controller: 'incidentsController',
    }).state('addincident', {
        url:"/addincident",
        templateUrl: 'app/views/addincident.html',
        controller: 'addIncidentController',
    }).state('editincident', {
        url:"/editincident/:uniqueIncidentId",
        templateUrl: 'app/views/addincident.html',
        controller: 'addIncidentController',
    })
}]);

 riskManagementSystem.directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
         iElementautocomplete({
             source: scope[iAttrs.uiItems],
             select: function() {
                 $timeout(function() {
                     iElement.trigger('input');
                 }, 0);
             }
         });
     };
 });
riskManagementSystem.directive('blurToCurrency', function($filter){
    return {
      scope: {
        amount  : '='
      },
      link: function(scope, el, attrs){
        el.val($filter('currency')(scope.amount));
        el.bind('focus', function(){
          el.val(scope.amount);
        });
        el.bind('input', function(){
          scope.amount = el.val();
          scope.$apply();
        });
        el.bind('blur', function(){
          el.val($filter('currency')(scope.amount,""));
        });
      }
    }
  });
  
 riskManagementSystem.directive('dateFormatter', [
    function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function postLink(scope, element, attrs, ngModel) {
            	ngModel.$parsers.push(function(data) {
            	  //console.log("parsers.push " + data);
                        var date = new Date(data);
                        var out = date.getDate() + "/"+(date.getMonth()+1)+"/"+date.getFullYear();
                //console.log("$parsers.out = " + out);
      				  return out;
  		        });
                
            	ngModel.$formatters.push(function(data) {
            	  //console.log("$formatters.push " + data);
                  var date = new Date(data);
                  var out = date.getDate() + "/"+(date.getMonth()+1)+"/"+date.getFullYear();
      					//console.log("$formatters.out =" + out);
      					return out;
  		        });
            }
        };
    }
]);
riskManagementSystem.directive("mapsDirective", function () {
    return {
        restrict: 'E',
        template: `<div id = "sample" style = "width:570px; height:400px;"></div>`,
        link:  function (scope, element, attrs) {

                var markers = [];
                var mapOptions = {
                   center: new google.maps.LatLng(51.5073391, -0.1284288), zoom: 18,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("sample"), mapOptions);
                google.maps.event.addListener(map, 'click', function (event) {
                    setMapOnAll(null);
                    placeMarkerAndPanTo(event.latLng, map);
                });
                function setMapOnAll(map) {
                    for (var i = 0; i < markers.length; i++) {
                        markers[i].setMap(map);
                    }
                }
                function geocodeLatLng(geocoder, map, latlang, infowindow) {
                    var latlngStr = latlang.split(',');
                    var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
                    geocoder.geocode({ 'location': latlng }, function (results, status) {
                        if (status === 'OK') {
                            if (results[0]) {
                                //map.setZoom(11);
                                infowindow.setContent(results[0].formatted_address);
                                scope["selectedLocation"] = {
                                    address: results[0].formatted_address,
                                    latlng: latlng
                                }
                                debugger
                                if(typeof scope.$parent["logIncidentDetails"]["placeOfIncident"]!= "undefined"){
                                    scope.$parent["logIncidentDetails"]["placeOfIncident"] = "http://maps.google.com/maps?q=" + latlng.lat + "+" + latlng.lng
                                }else{
                                    scope.$parent["logIncidentDetails"]={};
                                    scope.$parent["logIncidentDetails"]["placeOfIncident"] = "http://maps.google.com/maps?q=" + latlng.lat + "+" + latlng.lng
                                }
                            }
                        }
                        // else {
                        //     window.alert('Geocoder failed due to: ' + status);
                        // }
                    });
                }

                function placeMarkerAndPanTo(latLng, map) {
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map
                    });
                    markers.push(marker);
                    
                    var geocoder = new google.maps.Geocoder;
                    google.maps.event.addListener(marker, 'click', function (event) {
                        var infowindow = new google.maps.InfoWindow();
                        
                        if(event){
                            geocodeLatLng(geocoder, map, event.latLng.toUrlValue(), infowindow);
                        }else{
                            geocodeLatLng(geocoder, map, this.position.lat() +","+this.position.lng(), infowindow);
                        }
                        
                        infowindow.open(map, this);
                    });
                    
                    google.maps.event.trigger( marker, 'click' );
                    map.panTo(latLng);
                }

            }
    };
})