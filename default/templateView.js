define([
	'lib/ember',
	'view/PageTemplateView',
	'mixin/templateLoader',
	'lib/jquery',
],function( Ember, templateView, templateLoader, $ ){
	
	var view = templateView.extend({
		heading: '$Name',
		tagline: '$name',

		contentView: Ember.View.extend( templateLoader, {
			classNames: [ '$name' ],
			templateUrl: 'template/$name.html',
			contentBinding: Ember.Binding.oneWay('parentView.content')
		})

	});

	return view;
});