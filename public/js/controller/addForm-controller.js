define(
  [
  'angular',
  'js/service/tasks-service'
  ],
  function(angular) {
    'use strict';

    angular
    .module('todoApp.addForm-controller', ['todoApp.tasks-service'])
    .controller('AddFormController', [
      '$scope',
      '$state',
      'TasksService',
      function($scope,$state,TasksService) {

       setTimeout(function(){$('#addTaskFormModal').modal('show');}, 100);
       
       $(document).ready(function() {
        $('#datePickerField').datepicker({
          format : 'yyyy/mm/dd'
        });
      });

       $scope.close = function(){
        $('#addTaskFormModal').modal('toggle');
        setTimeout(function(){$state.go('home.dashboard');}, 200);
      };

      $scope.create = function(task) {
        var expires;
        expires=new Date(task.expire).getTime();

        var taskCopy = {
          content : task.content,
          expire : expires,
          finished : false
        };

        TasksService.addTask(taskCopy).then(function(){ $scope.update();});
        

        
        $('#addTaskFormModal').modal('toggle');
       
        setTimeout(function(){$state.go('^');}, 200);
      };

    }
    ]);
  }
  );