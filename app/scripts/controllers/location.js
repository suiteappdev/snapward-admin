angular
    .module('shoplyApp')
    .controller('locationCtrl', locationCtrl)

   function locationCtrl($scope, $rootScope, sweetAlert, $state, $timeout) {
      var icon = {
        url : 'https://s30.postimg.org/vy1nk4ki9/police2.png'
      };

      $rootScope.globalMarker = [];

      $scope.mapOptions = {
          zoom: 14,
          icon:icon,
          center: new google.maps.LatLng(9.3203291, -75.295614),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoomControl: true,
          styles : [
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 51
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 30
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 40
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
]
    };

    $scope.load = function(){
        $scope.$watch('myMap', function(o, n){
          if(n){
            google.maps.event.trigger($scope.myMap,'resize');
            $scope.myMap.setCenter(new google.maps.LatLng(9.3203291, -75.295614));
          }
        });
    }

    $rootScope.$on("ADD_MARKER", function(event, record){
          var location = new google.maps.LatLng(record.data.geo.latitude, record.data.geo.longitude);
          var icon = {
            url : 'https://s30.postimg.org/vy1nk4ki9/police2.png'
          };

          marker = new google.maps.Marker({
              icon : icon,
              map:$scope.myMap,
              animation: google.maps.Animation.DROP,
              position: location
          });


          $rootScope.globalMarker.push({id : record._id, marker : marker});

          google.maps.event.trigger($scope.myMap,'resize');
          $scope.myMap.setCenter(new google.maps.LatLng(record.data.geo.latitude, record.data.geo.longitude));
    })

    $rootScope.$on("DELETE_MARKER", function(event, _id){
        if(_id){
            for (var i = 0; i < $rootScope.globalMarker.length; i++) {
                if($rootScope.globalMarker[i].id == _id){
                   $rootScope.globalMarker[i].marker.setMap(null);
                   return;
                } 
            };
        }
    }) 
}