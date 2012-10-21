define([
	'lib/ember',
	'lib/jquery',
	'ctrlr/NavigationTabRegistry'
],function( Ember, $, navReg ){

	var loader = Ember.Mixin.create({

		init: function(){
			this._super();
			
			var navInfo = this.navtab_navInfo();

			navReg.register(
				navInfo.name,
				navInfo.location,
				navInfo.icon
			);

			this.set('route', '/' + navInfo.location );
		},

		enter: function( router ){
			this._super(router);
			this.navtab_setNav();
		},

		navtab_setNav: function(){
			var navRoute = this.navtab_navInfo();
		
			var ctrlr = App.get('router.navigationTabController');			

			ctrlr.set('activeTab', navRoute.location );
		},

		navtab_navInfo:function(){

			var nv = this.get('navRoute');

			if( typeof(nv) === "function" ){
				nv = nv.apply( this );
			}

			if( typeof(nv) !== "object" ){
				throw new Error("This object extends the NavTab Mixin,"
					+" but it's 'navInfo' property isn't an object"
					+" or a function that returns one.");
			}
			return nv;
		}

	});

	return loader;

});