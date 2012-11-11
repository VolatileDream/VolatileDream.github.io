define([
	'lib/ember',
	'lib/jquery',
	'mixin/templateLoader',
	'mixin/actionLogger',
	'ctrlr/NavigationTabRegistry'
],function( Ember, $, templateLoader, actionLogger, NavigationTabRegistry ){
	
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

			var tabName = this.get('controller.activeTab');
			
			var tab = NavigationTabRegistry.get( tabName );

			this.activateTab( tab );

		}.observes('controller.activeTab'),

		activateTab: function( tab ){

			$('.nav-element').removeClass('active');

			$( '#' + tab.id ).addClass('active');

			$('head title').get(0).textContent = 'Gianni Gambetti - ' + tab.name;
		}
	});


	return view;
});