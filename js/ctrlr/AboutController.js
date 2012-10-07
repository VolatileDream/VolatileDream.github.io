define([
	'lib/ember',
	'mixin/loader'
],function( Ember, loader ){
	
	var ctrl = Ember.ObjectController.extend({
		dataUrl: 'js/data/about.json'
	});

	return ctrl;
});