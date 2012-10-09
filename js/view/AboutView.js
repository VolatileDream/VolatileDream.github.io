define([
	'lib/ember',
	'view/PageTemplateView',
	'mixin/templateLoader',
	'mixin/navtab_view'
],function( Ember, templateView, templateLoader, navtab_view ){
	
	var view = templateView.extend( navtab_view, {
		heading: 'Gianni Gambetti',
		tagline: 'About Me',
		navInfo: { name:'About', location: 'about', icon: 'icon-user' },

		contentView: Ember.View.extend( templateLoader, {
			classNames: [ 'about' ],
			templateUrl: '/template/about.html',
			contentBinding: Ember.Binding.oneWay('parentView.content')
		})

	});

	return view;
});