define(
  [
  'angular', 
  'angular-ui-router',
  'ocLazyLoad'
  ],
  function(angular) {
  'use strict';

    angular.module('oc.lazyLoad.uiRouterDecorator', ['ui.router']).config(function($stateProvider) {

      //za vseki otdelen template se pravi templateCache fail, koito sled tova se lazy-load-va.
  
     function lazyBundle(module, files, templateUrl) {
      var lazyDeferred;
      return {
        templateProvider: function lazyTemplateProvider() { return lazyDeferred.promise; },
        resolve: ['$templateCache','$http', '$ocLazyLoad', '$q', function lazyResolve($templateCache,$http, $ocLazyLoad, $q) {
          lazyDeferred = $q.defer();
          return $ocLazyLoad.load({
            name: module, 
            files: angular.isArray(files) ? files : [files]
          }).then(function() {
            $http.get(templateUrl).then(function(result){
              lazyDeferred.resolve(result.data);
            });
            
          });
        }]
      };
    }
    
  // ako moje da se obqsni kak  raboti kato kod.
     $stateProvider.decorator('views', function ($state, parent) {
      var result = {},
      views = parent($state);
      
      angular.forEach(views, function (config, name) {
        if (config.lazyModule && config.lazyFiles && config.lazyTemplateUrl) {
         var bundle = lazyBundle(config.lazyModule, config.lazyFiles, config.lazyTemplateUrl);
          config.resolve.$lazyLoader = bundle.resolve;
          if (config.lazyTemplateUrl) config.templateProvider = bundle.templateProvider;
        }
        result[name] = config;
      });
      return views;
    });

   });
});