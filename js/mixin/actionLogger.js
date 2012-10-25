define([
	'lib/ember'
],function( Ember ){
	
	var mixin = Ember.Mixin.create({
		
		// exposed parameters

		// function that returns an object to log,
		// is passed the name of the function, and it's arguments

		// The assumption is that it will return an array of objects
		// each of which is a trimed down version of it's corresponding
		// position in the input
		logFunction: null,
		// an array of action functions to intercept and log
		loggedFunctions: Ember.A(),

		init: function(){
			this._super();
			this._loggingMixin_setup();
		},
		_loggingMixin_setup: function(){
			var funcs = this.get('loggedFunctions');

			for (var i = 0; i < funcs.length; i++) {

				(function( functionName, thingy ){
					var func = thingy.get( functionName );

					thingy.set( functionName, function(){
						thingy._loggingMixin_log( functionName, arguments );
						func.apply( thingy, arguments );
					});
				}( funcs[i], this ));
				
			};

		},
		_loggingMixin_log: function( func, data ){
			var pruneFunction = this.get('logFunction');
			if( pruneFunction ){
				data = pruneFunction.apply( this, [ func, data ] );
			}
			console.log( func, data );
		}
	});

	return mixin;

});