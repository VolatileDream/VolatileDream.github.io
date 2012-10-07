define([
	'lib/ember',
	'lib/jquery'
],function( Ember, $ ){
	
	/**
	 *
	 * Loader Mixin
	 *
	 * The loader mixin checks the content of
	 *  dataUrl and, loads it if it's not empty.

	 * It then continues to observe the dataUrl
	 *  field for change, and loads it again.
	 *
	 * It also exposes a reload function so that
	 *  the controller can reload the data.
	 *
	 */

	var loader = Ember.Mixin.create({

		init: function(){

			this._super();

			var dataUrl = this.get('dataUrl');
			
			if( dataUrl ){
				this._loaderMixin_load();
			}

		},

		reload: function(){
			this._loaderMixin_load();
		},

		_loaderMixin_success: function( controller, url ){
			return function( data, status, xhr ){
				console.log('loaded: ' + url );
				controller.set(dataField, data);
			}
		},

		_loaderMixin_error: function( url ){
			return function( xhr, status, thrown ){
				console.error('unable to load: ' + url+' due to '+status, thrown );
			}
		},

		_loaderMixin_load: function(){

			var dataUrl = this.get('dataUrl');

			if( dataUrl ){

				if( typeof(dataUrl) === "function" ){
					// call the fuction
					dataUrl = dataUrl.apply( this );
				}

				if( typeof(dataUrl) !== "string" ){
					throw new Error("This object has been extended with the loader mixin");
				}

				var controller = this;

				$.ajax({
					url: dataUrl,
					type: "GET",
					dataType: "json",
					success: this._loaderMixin_success( controller, dataUrl ),
					error: this._loaderMixin_error( dataUrl )
				});
			}else{
				throw new Error("This object has been extended with the loader mixin, and is missing a 'dataUrl' field.");
			}	
		}.observes('dataUrl')

	});

	return loader;

});