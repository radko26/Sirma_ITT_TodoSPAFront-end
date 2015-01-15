var requirejsConfig = { 
  baseUrl: '',
  paths: {
    'angular': [
      'lib/angular/angular.min'
    ],
    'angular-ui-router': [
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