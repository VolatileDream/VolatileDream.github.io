define(function(){

	/**
	 *
	 * Singleton instance of the Registry used by
	 *  the NavTabMixin and NavView
	 *
	 */

	var registry = {

		_content: [],

		register: function( name, location, icon ){

			if( this._content[name] ){
				throw new Error( name + ' has already been added to the NavTab Mixin registry');
			}

			this._content[name] = { location: location, icon: icon };
		},

		find: function( name ){
			return this._content[name];
		},

		remove: function( name ){
			if( name ){
				this._content[ name ] = null;
			} 
		}

	};

	return registry;
});