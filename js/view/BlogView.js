define([
	'lib/ember',
	'view/PageTemplateView',
	'mixin/templateLoader',
	'lib/jquery'
],function( Ember, templateView, templateLoader, $ ){
	
	var view = templateView.extend({
		heading: 'Blog',
		tagline: 'blog',

		contentView: Ember.View.extend( templateLoader, {
			classNames: [ 'blog' ],
			contentBinding: Ember.Binding.oneWay('parentView.content'),
			templateUrl: 'template/blog.html'
		})

	});

	return view;
});