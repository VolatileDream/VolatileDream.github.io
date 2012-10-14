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
  'view/ContactView',
  'ctrlr/ContactController',
  'view/ResumeView',
  'ctrlr/ResumeController',
  'ctrlr/NavigationTabController',
  // things we don't care about:
	'lib/bootstrap'
],function(
  Ember, router,
  appView, appCtrlr,
  aboutView, aboutController,
  ContactView, ContactController,
  ResumeView, ResumeController,
  NavigationTabController,
  bootstrap
){
  
  App = window.App = Em.Application.create({
    
    ApplicationController: appCtrlr,
    ApplicationView: appView,
    
    AboutController: aboutController,
    AboutView: aboutView,

    ContactController: ContactController,
    ContactView: ContactView,

    ResumeView: ResumeView,
    ResumeController: ResumeController,

    NavigationTabController: NavigationTabController,

    Router: router,

    ready: function(){
      console.log('init');
    }

  });

  App.initialize();

  return App;
});
