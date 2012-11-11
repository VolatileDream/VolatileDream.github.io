define([
	'lib/ember',
	'mixin/loader'
],function( Ember, loader ){
	
	var ctrl = Ember.ObjectController.extend( loader, {
		dataUrl: 'js/data/info.json'
	});

	return ctrl;
});