require.config({
  baseUrl: 'js'
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
  'ctrlr/InfoController',
  // things we don't care about:
	'lib/bootstrap', 'lib/jquery'
],function(
  Ember, router,
  appView, appCtrlr,
  aboutView, aboutController,
  ContactView, ContactController,
  ResumeView, ResumeController,
  BlogView, BlogController,
  NavigationTabController,
  InfoController,
  bootstrap, jquery
){
 
  // first, set some options for jquery ajax requests
  jquery.ajax( { cache:true } );
 
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

    InfoController: InfoController,
    NavigationTabController: NavigationTabController,

    Router: router,

    ready: function(){
      console.log('init');
    }

  });

  App.initialize();

  return App;
});
