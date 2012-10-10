define([
	'lib/ember',
	'view/PageTemplateView',
	'mixin/templateLoader',
	'mixin/navtab_view',
	'lib/jquery',
	'lib/jquery.timeago'
],function( Ember, templateView, templateLoader, navtab_view, $, timeago ){
	
	var view = templateView.extend( navtab_view, {
		heading: 'Gianni Gambetti',
		tagline: 'About Me',
		navInfo: { name:'About', location: 'about', icon: 'icon-user' },

		contentView: Ember.View.extend( templateLoader, {
			classNames: [ 'about' ],
			templateUrl: '/template/about.html',
			contentBinding: Ember.Binding.oneWay('parentView.content')
		}),

		didInsertElement:function(){
			this._super();

			$('abbr.timeago').timeago();

		}

	});

	return view;
});