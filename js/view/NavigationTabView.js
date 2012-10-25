define([
	'lib/ember',
	'lib/jquery',
	'mixin/templateLoader',
	'mixin/actionLogger'
],function( Ember, $, templateLoader, actionLogger ){
	
	var view = Ember.View.extend( templateLoader, actionLogger, {

		// for actionLogger
		loggedFunctions: [ 'activateTab' ],

		classNames: ['navigationTab'],

		templateUrl: 'template/navtab.html',
		controllerBinding: 'App.router.navigationTabController',
		contentBinding: 'controller',
		didInsertElement: function(){
			this._super();
			
			Ember.run.later(this,function(){
				this.changeTab();
			},100);
		},
		changeTab: function(){

			var tab = this.get('controller.activeTab');
			this.activateTab( tab );

		}.observes('controller.activeTab'),

		activateTab: function( tab ){

			$('.nav-element').removeClass('active');
			$('#nav-location-' + tab ).addClass('active');
		}
	});


	return view;
});