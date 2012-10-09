require.config({
  baseUrl: 'js',
  paths: {
    lib: '../lib'
  }
});


requirejs([
	'lib/ember',
  'ctrlr/router',
	'view/ApplicationView',
  'ctrlr/ApplicationController',
  'view/AboutView',
  'ctrlr/AboutController',
  'ctrlr/NavigationTabController',
  // things we don't care about:
	'lib/bootstrap'
],function(
  Ember, router,
  appView, appCtrlr,
  aboutView, aboutController,
  NavigationTabController,
  bootstrap
){
  
  App = window.App = Em.Application.create({
    
    ApplicationController: appCtrlr,
    ApplicationView: appView,
    
    AboutController: aboutController,
    AboutView: aboutView,

    NavigationTabController: NavigationTabController,

    Router: router,

    ready: function(){
      console.log('init');
    }

  });

  App.initialize();

  return App;
});
