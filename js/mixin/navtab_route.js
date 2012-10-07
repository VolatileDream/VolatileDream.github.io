define([
	'lib/ember',
	'lib/jquery',
	'ctrlr/NavigationTabController'
],function( Ember, $, navReg ){

	var loader = Ember.Mixin.create({
		enter: function( router ){
			this._super(router);
			
			var navTab = this.get('navTab');
			
			if( navTab ){

				if( typeof(navTab) === 'function' ){
					navTab = navTab.apply( this );
				}

				$('.nav-element').removeClass('active');

				$('#nav-location-' + navTab ).addClass('active');

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