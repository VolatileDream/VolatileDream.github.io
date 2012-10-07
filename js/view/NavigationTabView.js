define([
	'lib/ember',
	'lib/jquery',
	'mixin/templateLoader'
],function( Ember, $, templateLoader ){
	
	var view = Ember.View.extend( templateLoader, {
		templateUrl: '/template/navtab.html'
	});


	return view;
});