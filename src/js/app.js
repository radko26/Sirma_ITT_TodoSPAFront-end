define(
  [
  'angular',
  'js/controller/home-controller',
  'angular-ui-router',
  'ocLazyLoad',
  'js/ocLazyLoaduiRouterDecorator'
  ],
  function(angular) {
    'use strict';

    angular
    .module('todoApp', ['todoApp.home-controller','ui.router','oc.lazyLoad','oc.lazyLoad.uiRouterDecorator'])
    .config([
      '$locationProvider',
      '$stateProvider',
      '$urlRouterProvider',
      '$ocLazyLoadProvider',

      function($locationProvider,$stateProvider,$urlRouterProvider,$ocLazyLoadProvider) { 
        $ocLazyLoadProvider.config({
         loadedModules: ['todoApp'],
         asyncLoader: require
       });
        $urlRouterProvider.when('/dashboard/add','home/dashboard/add');
        $urlRouterProvider.when('/dashboard','home/dashboard');

        $urlRouterProvider.otherwise('/home/dashboard');

        $stateProvider

        .state('home', {
          abstract:true,
          url: '/home',
          templateUrl: 'public/template/home.html' ,
          controller: 'HomeController'
        })
        .state('home.dashboard', {
          url: "/dashboard",
          lazyModule: 'todoApp.dashboard-controller',
          lazyFiles: 'js/controller/dashboard-controller',
          lazyTemplateUrl: 'public/template/dashboard.html',
          controller: 'DashboardController'
        }).state('home.dashboard.add',{
         url: '/add',
          lazyModule: 'todoApp.addForm-controller',
          lazyFiles: 'js/controller/addForm-controller',
          lazyTemplateUrl: 'public/template/addForm.html',
          controller: 'AddFormController'
      });


    }
    ]);
}
);