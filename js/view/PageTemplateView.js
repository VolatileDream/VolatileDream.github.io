define([
	'lib/ember',
	'mixin/templateLoader'
],function( Ember, templateLoader ){

	var view = Ember.View.extend( templateLoader, {
		templateUrl: '/template/pageTemplate.html',

		//override everything below here:
		heading: 'Put Heading Here',
		tagline: 'Put Tagline Here',
		contentView: Ember.View,
		// this is for use with the navtab stuff
		navInfo: { name:'navtab name', location: 'navtab-location', icon: 'nav-icon' }
	});

	return view;
});