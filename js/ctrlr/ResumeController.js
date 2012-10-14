define([
	'lib/ember',
	'mixin/loader'
],function( Ember, loader ){
	
	var ctrlr = Ember.ObjectController.extend( loader, {
		dataUrl: 'js/data/resume.json'
	});

	return ctrlr;
});