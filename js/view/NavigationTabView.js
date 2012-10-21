define([
	'lib/ember',
	'lib/jquery',
	'mixin/templateLoader'
],function( Ember, $, templateLoader ){
	
	var view = Ember.View.extend( templateLoader, {
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

			$('.nav-element').removeClass('active');

			$('#nav-location-' + tab ).addClass('active');

		}.observes('controller.activeTab')
	});


	return view;
});