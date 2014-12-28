define(
  ['angular'],
  function(angular) {
    'use strict';

    angular
    .module('todoApp.success-directive', [])
    .directive('successDirective', [function() {
      return {
        scope : {
          task : '='
        },
        link : function(scope, element) {
          if (scope.task.finished) {
            element.addClass('success');
          }
        }
      };
    }]);
  }
  );