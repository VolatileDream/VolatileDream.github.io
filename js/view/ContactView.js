define([
	'lib/ember',
	'view/PageTemplateView',
	'mixin/templateLoader',
	'lib/jquery',
	'lib/jquery.timeago'
],function( Ember, templateView, templateLoader, $, timeago ){
	
	var view = templateView.extend({
		heading: 'Contact Me',
		tagline: 'Getting in touch',

		contentView: Ember.View.extend( templateLoader, {
			classNames: [ 'contact' ],
			templateUrl: 'template/contact.html',
			contentBinding: Ember.Binding.oneWay('parentView.content')
		})
	});

	return view;
});