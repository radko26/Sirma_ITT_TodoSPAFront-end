define(
  ['angular'],
  function(angular) {
    'use strict';

    angular
      .module('todoApp.header-directive')
      .directive('header-directive', function() {
        return {
          template: 'Hello dear',
        };
      });
  }
);