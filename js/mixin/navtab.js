define([
	'lib/ember',
	'mixin/nav_registry'
],function( Ember, navReg ){

	/**
	 *
	 * NavTab Mixin
	 *
	 * Allows a View to register to have a tab
	 *  displayed inside the Navigation Tab View
	 * 
	 * Automatically registers and deregisters the view
	 *
	 * Requires that the view has the property navInfo
	 *  which is either an object or a function that 
	 *  returns an object with the properties:
	 *   name, location, icon
	 *
	 * name -> name of the tab, text that appears in the tab
	 * location -> id of the tab ( can't start with # )
	 * icon -> name of the twitter glyphicon to use.
	 *
	 */


	var mixin = Ember.Mixin.create({

		init: function(){
			this._super();

			var navInfo = this.navtab_navInfo();

			navReg.register( navInfo.name, navInfo.location, navInfo.icon );
		},

		navtab_navInfo:function(){

			var nv = this.get('navInfo');

			if( typeof(nv) === "function" ){
				nv = nv.apply( this );
			}

			if( typeof(nv) !== "object" ){
				throw new Error("This object extends the NavTab Mixin,"
					+" but it's 'navInfo' property isn't an object"
					+" or a function that returns one.");
			}

			return navInfo;

		},

		destroy: function(){

			var navInfo = this.navtab_navInfo();

			navReg.remove( navInfo.name );

			this._super();
		}
	});

	return mixin;

});