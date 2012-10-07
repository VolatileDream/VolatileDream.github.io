define([
	'lib/ember',
	'view/PageTemplateView',
	'mixin/templateLoader'
],function( Ember, templateView, templateLoader ){
	
	var view = templateView.extend({
		heading: 'Gianni Gambetti',
		tagline: 'About Me',
		navInfo: { name:'About', location: '/about', icon: 'icon-user' },

		contentView: Ember.View.extend( templateLoader, {
			templateUrl: 'template/about.html'
			contentBinding: Ember.Binding.oneWay('parentView.content')
		})

	});

	return view;
});