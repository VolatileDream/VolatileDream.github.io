define([
	'lib/ember',
	'lib/jquery',
	'mixin/templateLoader'
],function( Ember, $, templateLoader ){
	
	var view = Ember.View.extend( templateLoader, {
		templateUrl: '/template/navtab.html',
		controllerBinding: 'App.router.navigationTabController',
		contentBinding: 'controller'
	});


	return view;
});