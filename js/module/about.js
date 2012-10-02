define([
	'ember',
	'module/loader'
],function( Ember, loader ){
	//set up about view and controller
	var ob = {
		controller : Ember.ObjectController.extend( loader, {
			content: null,
			dataUrl: 'js/data/about.json'
		}),
		view: Ember.View.extend({
			template: Ember.Handlebars.compile("About me:{{text}}")
		})
	};

	return ob;
});