define([
	'lib/ember',
	'view/PageTemplateView',
	'mixin/templateLoader'
],function( Ember, PageTemplateView, templateLoader ){

	var view = PageTemplateView.extend({
		heading: 'Resume',
		tagline: 'Hire me?',

		contentView: Ember.View.extend( templateLoader, {
			classNames: [ 'resume' ],
			templateUrl: 'template/resume.html',
			contentBinding: Ember.Binding.oneWay('parentView.content')
		})

	});
	return view;
	
});