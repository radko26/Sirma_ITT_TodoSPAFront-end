define(
  ['angular'],
  function(angular) {
    'use strict';
    angular
    .module('todoApp.tasks-service', ['todoApp.global-service'])
    .factory('TasksService', ['$http','Rest',function($http,Rest) {
      return{
        getTasks : function() {
          return $http.get(Rest.getTasks).then();
        },

        addTask : function(task) {
          return $http.post(Rest.addTask,task).then();
        },

        removeTask : function(task){
           return $http.delete(Rest.removeTask(task)).then();
        },

        markAsFinished: function(task){
          return $http.post(Rest.markAsFinished,task).then();
        }

      };
     
      }]);
  }
  );

