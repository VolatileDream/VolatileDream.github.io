define([
	'lib/ember',
	'view/PageTemplateView',
	'mixin/templateLoader',
	'lib/jquery',
],function( Ember, templateView, templateLoader, $ ){
	
	var view = templateView.extend({
		heading: 'Blog',
		tagline: 'blog',

		controllerBinding: 'App.router.blogPostController',
		contentBinding: 'controller',

		contentView: Ember.View.extend( templateLoader, {
			classNames: [ 'blog', 'post' ],
			contentBinding: Ember.Binding.oneWay('parentView.content'),
			templateUrl: 'template/blogpost.html'
		})

	});

	return view;
});