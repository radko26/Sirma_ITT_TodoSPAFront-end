define(
  ['angular'],
  function(angular) {
    'use strict';

    angular
      .module('todoApp.global-service', [])
      .factory('Rest', function() {
        return {        
          getTasks : '/tasks',
          addTask : '/tasks/create',
          removeTask: function(task){
            return ('tasks/delete/' + task.id);
          },
          markAsFinished: '/tasks/mark'
        };
      });
  }
);

