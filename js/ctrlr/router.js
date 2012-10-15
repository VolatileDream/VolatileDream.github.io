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
				navRoute: { name:'About', location: 'about', icon: 'icon-user' },
				connectOutlets: function( router, evnt ){
					router.get('applicationController').connectOutlet( 'about' );
				}
			}),

			contact: Ember.Route.extend( navRoute, {
				navRoute: { name:'Contact', location: 'contact', icon: 'icon-envelope' },
				connectOutlets:function( router, evnt ){
					router.get('applicationController').connectOutlet( 'contact' );
				}
			}),

			resume: Ember.Route.extend( navRoute, {
				navRoute: { name: 'Resume', location: 'resume', icon: 'icon-file' },
				connectOutlets:function( router, evnt ){
					router.get('applicationController').connectOutlet( 'resume' );
				}
			})

		})
	});
	return Router;
});
