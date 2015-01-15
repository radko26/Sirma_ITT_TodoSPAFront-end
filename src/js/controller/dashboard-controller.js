define(
  [
  'angular',
  'js/service/date-service',
  'js/directive/date-directive',
  'js/directive/grid-directive',
  'js/service/global-service',
  'js/service/tasks-service',
  'js/directive/success-directive'
  ],
  function(angular) {
    'use strict';

    angular
    .module('todoApp.dashboard-controller', [
      'todoApp.date-service',
      'todoApp.date-directive',
      'todoApp.grid-directive',
      'todoApp.global-service',
      'todoApp.tasks-service',
      'todoApp.success-directive',

      ])
    .controller('DashboardController', [
      '$scope',
      '$state',
      'TasksService',
      function($scope,$state,TasksService) {
        $scope.table = [];

        $scope.update = function(){
          TasksService.getTasks().then(function(tasks){   
            $scope.table = tasks.data;
          });
        };

        $scope.update();

        $scope.isFinished = function(task){
         return !task.finished;
       };

       $scope.markAsFinished = function(task){
        console.log('should mark as finished ' + task.content);
        TasksService.markAsFinished(task).then(function(){ $scope.update();});
       
      };

      $scope.deleteTask = function(task){
        console.log('should delete task ' + task.content);
        TasksService.removeTask(task).then(function(){ $scope.update();});
      };

      $scope.add = function (){
        $state.go('home.dashboard.add');
      };
    }
    ]);
  }
  );