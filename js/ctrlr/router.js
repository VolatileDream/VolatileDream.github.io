define([
	'lib/ember',
	'mixin/navtab_route'
],function( Ember, navRoute ){
	

	// Note that Routes here are extended using
	// the NavigationTab mixin, which overrides Route.enter()

	var Router = Ember.Router.extend({
		enableLogging: true,
		root: Ember.Route.extend({

			index: Ember.Route.extend({
			  route: '/',
			  redirectsTo: 'about' // this is a route name
			}),
			
			about: Ember.Route.extend( navRoute, {
				navTab: 'about',
				route: '/about',
				connectOutlets: function( router, evnt ){
					router.get('applicationController').connectOutlet( 'about' );
				}
			})
		})
	});
	return Router;
});
