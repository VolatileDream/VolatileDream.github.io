require.config({
  baseUrl: 'js',
  paths: {
    lib: '../lib'
  }
});


requirejs([
	'lib/ember',
  'router',
	'view/ApplicationView',
  'ctrlr/ApplicationController',
  'view/AboutView',
  'ctrlr/AboutController',
  'view/ContactView',
  'ctrlr/ContactController',
  'view/ResumeView',
  'ctrlr/ResumeController',
  'view/BlogView',
  'ctrlr/BlogController',
  'ctrlr/NavigationTabController',
  // things we don't care about:
	'lib/bootstrap'
],function(
  Ember, router,
  appView, appCtrlr,
  aboutView, aboutController,
  ContactView, ContactController,
  ResumeView, ResumeController,
  BlogView, BlogController,
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

    BlogView: BlogView,
    BlogController: BlogController,

    NavigationTabController: NavigationTabController,

    Router: router,

    ready: function(){
      console.log('init');
    }

  });

  App.initialize();

  return App;
});
