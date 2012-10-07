require.config({
  baseUrl: 'js',
  paths: {
    lib: '../lib'
  }
});


define([
	'lib/ember',
  'ctrlr/router',
	'view/ApplicationView',
  'ctrlr/ApplicationController',
  'view/AboutView',
  'ctrlr/AboutController',
	'lib/bootstrap'
],function(
  Ember, router,
  appView, appCtrlr,
  aboutV, aboutC
){
  
  var App = Em.Application.create({
    
    ApplicationController: appCtrlr,
    ApplicationView: appView,
    
    AboutController: aboutC,
    AboutView: aboutV,

    ready: function(){
      console.log('init');
    }

  });

  var routerInstance = router.create();

  App.initialize( routerInstance );

  return (window.App = App);
});