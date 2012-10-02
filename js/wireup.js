define([
	'ember',
	'module/app',
	'module/about',
	'module/projects',
	'module/resume',
	'module/contact',
	'module/router',
  'module/info',
	'bootstrap'
],function( Ember, app, about, projects, resume, contact, router, info ){
  
  var App = Em.Application.create({
    
    ApplicationController: app.controller,
    ApplicationView: app.view,
    
    AboutController : about.controller,
    AboutView : about.view,
    
    ProjectController : projects.controller,
    ProjectView : projects.view,

    ContactController : contact.controller,
    ContactView : contact.view,

    ResumeController: resume.controller,
    ResumeView : resume.view,

    InfoController: info.controller,

    ready: function(){
      console.log('init');
    }

  });

  var routerInstance = router.create();

  App.initialize( routerInstance );

  return (window.App = App);
});