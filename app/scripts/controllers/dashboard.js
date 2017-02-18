'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('DashboardCtrl', function ($scope, api, modal, storage, $state, $rootScope, $timeout, permission, sweetAlert) {
    $scope.records = [];

    $scope.load = function(){
      api.pedido().get().success(function(res){
        $scope.records = res || [];
      })
    }

    $scope.Remove = function(){
        var _record = this.record || $rootScope.grid.value;
        modal.removeConfirm({closeOnConfirm : true}, 
            function(isConfirm){ 
               if (isConfirm) {
                    api.pedido(_record._id).delete().success(function(res){
                        $scope.records.splice($scope.records.indexOf(_record), 1);
                        $rootScope.$emit("DELETE_MARKER", _record._id)
                    });
               }
           })
    }

    $scope.OnRoad = function(){
      var _record = angular.copy(this.record);
      _record.data.status = 'En Camino';
      _record._user = _record._user._id;

      api.pedido(_record._id).put(_record).success(function(res){
        if(res){
            sweetAlert.swal("En Camino", "Una patrulla ya se dirije al lugar de la incidencia.", "success");
            $scope.load();
        }
      });
    }

    $scope.Pending = function(){
      var _record = angular.copy(this.record);
    }

    $rootScope.$on("incoming_request", function(event, data){
      $scope.records.push(data);
    });

    $rootScope.$on("request_updated", function(event, request){
      var updated = false;

     for (var i = 0; i < $scope.records.length; i++) {
       if($scope.records[i]._id == request._id){
          $scope.records[i].data.incidencia = request.data.incidencia;
           updated = true;    
          $scope.$apply();
          return;
       }
     };

     if(updated){
          toastr.success('Se ha actualizado una alerta', {timeOut: 1000});
     }

     $scope.$apply();
    });

    $scope.showMarker = function(){
      $rootScope.$broadcast('ADD_MARKER', this.record)
    }

  });
