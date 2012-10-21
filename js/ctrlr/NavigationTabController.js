define([
	'lib/ember',
	'ctrlr/NavigationTabRegistry'
],function( Ember, NavigationTabRegistry ){

	/**
	 *
	 * Singleton instance of the Registry used by
	 *  the NavTabMixin and NavView
	 *
	 */

	var registry = Ember.ArrayController.extend({

		content:  NavigationTabRegistry.content,
		activeTab: null
	});

	return registry;
});