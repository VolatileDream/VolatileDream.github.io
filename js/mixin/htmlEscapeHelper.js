define([
	'lib/handlebars'
],function( Handlebars ){
	
	Handlebars.registerHelper('htmlEscape', function(property, options) {
		var value = Ember.Handlebars.getPath(this, property, options);

		return new Handlebars.SafeString( value );
	});

	return null;

});