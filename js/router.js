define([
	'lib/ember',
	'mixin/navtab_route',
	'mixin/actionLogger'
],function( Ember, navRoute, actionLogger ){
	

	// Note that Routes here are extended using
	// the NavigationTab mixin, which overrides Route.enter()

	var Router = Ember.Router.extend({
		
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

			blog: Ember.Route.extend( navRoute, actionLogger, {
				navRoute: { name:'Blog', location: 'blog', icon: 'icon-list' },
				
				showPost: function( router, evnt ){
					router.transitionTo('blog.post', evnt.context );
				},	

				index: Ember.Route.extend({
					route: '/',
					connectOutlets: function( router, evnt ){
						router.get('applicationController').connectOutlet( 'blog' );
					}
				}),
				
				post: Ember.Route.extend({
					route: '/post/:id',
					deserialize: function( router, context ){
						return router.get('blogController').getById( context.id );
					},
					serialize: function( router, context ){
						return { id: context.id };
					},
					connectOutlets: function( router, post ){
						router.get('applicationController').connectOutlet( 'blog' );
						router.get('blogController').set( 'currentPostId', post.id );
					}
				})
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
