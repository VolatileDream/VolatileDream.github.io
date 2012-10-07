define([
	'lib/ember',
	'lib/jquery'
],function( Ember, $ ){
	
	/*
	 * TemplateLoader Mixin
	 *
	 * This mixin checks the 'templateURL' field
	 *  for a string, or a function that returns
	 *  a string to the location of the template
	 *  for the view.
	 *
	 */


	var mixin = Ember.Mixin.create({

		init: function(){

			var templateURL = this.get('templateURL');

			if( typeof(templateURL) ==='function' ){
				templateURL = templateURL.apply( this );
			}

			if( typeof(templateURL) !== 'string' ){
				throw new Error('This object extends the TemplateLoader Mixin,'
					+" but does not a field 'templateURL' that is a URL/function.");
			}

			$.ajax({
				method: "GET",
				async: false,
				dataType: 'text',
				url: templateURL,
				success: this._templateLoader_success( this, templateURL ),
				error: this._templateLoader_error( templateURL )
			});

		},

		_templateLoader_success: function( controller, url ){
			return function( data, status, xhr ){
				console.log('loaded: ' + url );
				var template = Ember.Handlebars.compile( data );
				controller.set('template', template );
			}
		},

		_templateLoader_error: function( url ){
			return function( xhr, status, thrown ){
				console.error('unable to load: ' + url+' due to '+status, thrown );
			}
		},

	});

});