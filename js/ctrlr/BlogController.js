define([
	'lib/ember',
	'mixin/loader'
],function( Ember, loader ){
	
	var ctrl = Ember.ArrayController.extend( loader, {
		dataUrl: 'js/data/blog.json',
		content: Ember.A(),

		currentPost: function(){

			var id = this.get('currentPostId');

			if( id == -1 ){
				return this.get('content')[0];
			}

			var contentLoaded = this.get('content.length') > 0;

			if( !contentLoaded ){
				// return something in the mean time,
				// and setup to load something else later
			}

			return this.getById( id );

		}.property('currentPostId', 'content'),

		currentPostId: -1,

		getById: function( id ){
			var content = this.get('content');
			for (var i = 0; i < content.length; i++) {
				if( content[i].id == id ){
					return content[i];
				}
			}

			return {
				id: id,
				title: 'Oops...',
				post: "Looks like we couldn't find the post you're looking for..."
			};
		}
	});

	return ctrl;
});