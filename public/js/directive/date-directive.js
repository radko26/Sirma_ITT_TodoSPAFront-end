define(
  ['angular'],
  function(angular) {
    'use strict';

    angular
    .module('todoApp.date-directive',['todoApp.date-service'])
    .directive('dateDirective', ['DateService', function(DateService) {
     return {
      scope : {
        task : '='
      },
      template: '{{date}}',
      link: function($scope) {
        $scope.$watch('task', function(task) {
          $scope.date = DateService.formatDate(task.expire);
        });
      }

    };
   }]);
  }
);