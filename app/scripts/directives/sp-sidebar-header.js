'use strict';
angular.module('shoplyApp')
  .directive('spSidebarHeader', function () {
      return {
      	  replace :true,
          templateUrl: 'views/system-shoply/sp-sidebar-header.html',
          restrict: 'EA',
          link: function postLink(scope, element, attrs) {

          }
      };
  });
