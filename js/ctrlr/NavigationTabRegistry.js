define([
	'lib/ember'
],function( Ember ){
	
	var registry = Ember.ArrayController.create({

		content: [],

		_registry: {},

		register: function( name, location, icon ){

			if( this._registry[name] ){
				throw new Error( name + ' has already been added to the NavTab Mixin registry');
			}

			var tab = {
				name: name,
				location: '#/'+location,
				id: 'nav-location-' + location,
				icon: icon
			};
			this._registry[location] = tab;

			this.addObject( tab );
		},

		get: function( name ){

			return this._registry[name];

		},

		remove: function( name ){
			if( name ){
				var tab = this._registry[ name ];
				this.removeObject( tab );
				this._registry[ name ] = null;
			} 
		}

	});


	return registry;
});