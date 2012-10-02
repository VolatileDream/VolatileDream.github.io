define([
	'ember',
	'module/loader'
],function( Ember, loader ){
	var obj = {
		controller: Ember.Controller.extend( loader, {
			dataUrl: 'js/data/info.json',
			content: null
		})
	};
	return obj;
});