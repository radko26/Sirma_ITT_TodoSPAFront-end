define(
  ['angular'],
  function(angular) {
    'use strict';

    angular
    .module('todoApp.time-directive')
    .directive('timeFormat', ['compile', function($compile) {
     return {
      scope : {
        task : '='
      },
      link : function(scope,element,attr){
        if(scope.task.expire == 0){

        }else{
          var date = new Date(scope.task.expire);
          element.append(date.toDateString());
        }
      }

    };
  }]);
  }
  );