define(
  ['angular'],
  function(angular) {
    'use strict';
    angular
    .module('todoApp.getTasks-service', ['todoApp.global-service'])
    .factory('GetTasksService', ['$http','Rest',function($http,Rest) {
      return {
        getTasks: function() {
          return $http.get(Rest.getTasks).then(function(table){
            return table;
          });
        }
      }
      }]);
  }
  );

