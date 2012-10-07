define([
	'lib/ember',
	'mixin/templateLoader'
],function( Ember, templateLoader ){

	var view = Ember.View.extend( templateLoader, {
		templateUrl: 'template/pageTemplate.html',
		heading: 'Put Heading Here',
		tagline: 'Put Tagline Here',
		content: Ember.View
	});

	return view;
});