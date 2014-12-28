define(
  ['angular'],
  function(angular) {
    'use strict';

    angular
    .module('todoApp.date-service', [])
    .factory('DateService', function() {
      return {
        formatDate: function(date) {
          if(date === 0){
              return '';
          }else{
            var formatedDate = new Date(date);
            return formatedDate.toDateString();
          }
        }
      };
    });
  }
  );

