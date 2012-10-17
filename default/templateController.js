define([
	'lib/ember',
	'mixin/loader'
],function( Ember, loader ){
	
	var ctrl = Ember.ObjectController.extend( loader, {
		dataUrl: 'js/data/$name.json'
	});

	return ctrl;
});