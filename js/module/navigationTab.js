define([
	'ember',
	'jquery'
],function( Ember, $ ){

	var loader = Ember.Mixin.create({
		enter: function( router ){
			this._super(router);
			
			var navTab = this.get('navTab');
			
			if( navTab ){
				$('.nav-element').removeClass('active');
				$('#loc-' + navTab ).addClass('active');
			}else{
				throw new Error("This object has been extended with the NavigationTab mixin, and is missing a 'navTab' field.");
			}
		}
	});

	return loader;


	function activeNav( part ){
	  
	  console.log('active: ' + part);
	}
	window.activeNav = activeNav;
	return activeNav;
});