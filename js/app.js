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
	'lib/bootstrap'
],function(
  Ember, router,
  appView, appCtrlr
){
  
  var App = Em.Application.create({
    
    ApplicationController: appCtrlr,
    ApplicationView: appView,
    
    ready: function(){
      console.log('init');
    }

  });

  var routerInstance = router.create();

  App.initialize( routerInstance );

  return (window.App = App);
});