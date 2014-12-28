var requirejsConfig = { // jshint ignore:line
  baseUrl: 'public/',
  paths: {
    'angular': [
     //'//ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular.min',
      'lib/angular/angular.min'
    ],
    'angular-ui-router': [
      //'//angular-ui.github.io/ui-router/release/angular-ui-router',
      //'lib/angular-ui-router/release/angular-ui-router',
      'lib/angular-ui-router/release/angular-ui-router.min'
    ],
    'ocLazyLoad':[
      'lib/oclazyload/dist/ocLazyLoad.min'
    ]
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-ui-router' : {
      deps: ['angular']
    },
    'ocLazyLoad' : {
      deps: ['angular']
    }
  }
};