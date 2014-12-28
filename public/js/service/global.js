define(
  ['angular'],
  function(angular) {
    'use strict';

    angular
      .module('todoApp.global-service', [])
      .factory('Rest', function() {
        return {        
          base : 'http://localhost:8080/SirmaTaskManager/rest/tasks',
          add : ''
        };
      });
  }
);

