define([
	'lib/ember',
	'mixin/loader'
],function( Ember, loader ){
	
	var ctrl = Ember.ArrayController.extend( loader, {
		dataUrl: 'js/data/blog.json',
		content: Ember.A(),

		getById: function( id ){
			var content = this.get('content');
			for (var i = 0; i < content.length; i++) {
				if( content[i].id == id ){
					return content[i];
				}
			}
			return {
				id: 'missing',
				title: 'Oops...',
				content: "Doesn't look like this blog entry exists..."
			};
		}
	});

	return ctrl;
});