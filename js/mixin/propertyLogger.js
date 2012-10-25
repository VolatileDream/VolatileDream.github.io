define([
	'lib/ember'
],function( Ember ){
	
	var mixin = Ember.Mixin.create({
		
		// exposed parameters

		// function that returns an object to log,
		// is passed the name of the function, and it's arguments

		// an array of action functions to intercept and log
		loggedProperties: Ember.A(),

		init: function(){
			this._super();

			// setup observers
			var properties = this.get('loggedProperties');

			for (var i = 0; i < properties.length; i++) {

				var propertyName = properties[i];

				var obs = this._loggingMixin_createLogFunction( propertyName );

				// need the name later when we disconnect
				obs.propertyName = propertyName;

				Ember.addObserver(
					this,
					propertyName,
					this,
					obs
				);
				
			};
		},

		_observerBank: [],

		_loggingMixin_createLogFunction: function( prop ){
			return function(){
					var data = this.get( prop );
					console.log( prop, data );
				}
		},

		destroy: function(){

			//remove our observers
			var properties = this.get('_observerBank');

			for (var i = 0; i < properties.length; i++) {

				Ember.removeObserver(
					this,
					properties[i].propertyName,
					this,
					properties[i]
				);

			};

			delete this._observerBank;

			this._super();
		}
	});

	return mixin;

});