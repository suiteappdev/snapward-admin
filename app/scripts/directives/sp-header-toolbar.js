'use strict';
angular.module('shoplyApp')
  .directive('spHeaderToolbar', function () {
      return {
      	  replace :true,
          templateUrl: 'views/system-shoply/sp-header-toolbar.html',
          restrict: 'EA',
          link: function postLink(scope, element, attrs) {

          }
      };
  });
