'use strict';

/**
 * @ngdoc function
 * @name shoplyApp.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller of the shoplyApp
 */
angular.module('shoplyApp')
  .controller('RequestCtrl', function ($scope, $window,$timeout, constants, api, $state, modal, $rootScope) {
    $scope.request_status = constants.request_status;
    $scope.Records = false;
    $scope.records = [];
    

    $scope.load = function(){
      api.pedido().get().success(function(res){
          $scope.records = res || [];
          $scope.Records = true;          
      });
    }

    $scope.location = function(){
        if(!this.record.data.geo){
              sweetAlert("Ups", "Coordenadas no disponibles", "warning");
            return;
        }

        $scope.ubicacion = this.record.data.geo;
        modal.show({templateUrl : 'views/ordenes/localizacion.html', size :'md', scope : $scope, backdrop:'static'}, function($scope){
            $scope.$close();
        });
    }

    $scope.delete = function(){
        var _record = this.record;

        modal.removeConfirm({closeOnConfirm : true}, 
            function(isConfirm){ 
               if (isConfirm) {
            api.pedido(_record._id).delete().success(function(res){
                  sweetAlert("Correcto", "Se ha eliminado este registro", "success");
                        $scope.records.splice($scope.records.indexOf(_record), 1);
            });
               }
           })
    }

    $scope.detail = function(){
      $state.go('dashboard.detalle_pedido', {pedido: this.record._id});
    }
  
  $scope.myConfig = {
    valueField: 'status',
    labelField: 'status',
    placeholder: 'Estado',
    onInitialize: function(selectize){
      // receives the selectize object as an argument
    },
    maxItems: 1
  };
  });
