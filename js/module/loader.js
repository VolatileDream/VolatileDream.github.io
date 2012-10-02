define([
	'ember',
	'jquery'
],function( Ember, $ ){
	
	var loader = Ember.Mixin.create({
		init: function(){

			this._super();

			var dataUrl = this.get('dataUrl');
			var dataField = this.get('dataField') || 'content';

			if( dataUrl ){
				var controller = this;

				var success = function( data, status, jqXHR ){
					console.log('loaded: ' + dataUrl );
					controller.set(dataField, data);
				};

				$.ajax({
					url: dataUrl,
					type: "GET",
					dataType: "json",
					success: success
				});
			}else{
				throw new Error("This object has been extended with the loader mixin, and is missing a 'dataUrl' field.");
			}
		}
	});

	return loader;

});