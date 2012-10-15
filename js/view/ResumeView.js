define([
	'lib/ember',
	'view/PageTemplateView',
	'mixin/templateLoader'
],function( Ember, PageTemplateView, templateLoader ){

	var view = PageTemplateView.extend({
		heading: 'My Resume',
		tagline: "Where I've been, and what I've done",

		contentView: Ember.View.extend( templateLoader, {
			classNames: [ 'resume' ],
			templateUrl: 'template/resume.html',
			contentBinding: Ember.Binding.oneWay('parentView.content')
		})

	});
	return view;
	
});