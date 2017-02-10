'use strict';
angular.module('shoplyApp')
  .directive('spSidebarMenu', function () {
      return {
      	  replace :true,
          templateUrl: 'views/system-shoply/sp-sidebar.html',
          restrict: 'EA',
          link: function postLink(scope, element, attrs) {
          	element.find('#sp-menu').metisMenu();
          }
      };
  });
