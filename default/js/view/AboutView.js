define([
	'lib/ember',
	'view/PageTemplateView',
	'mixin/templateLoader',
	'lib/jquery',
	'lib/jquery.timeago'
],function( Ember, templateView, templateLoader, $, timeago ){
	
	var view = templateView.extend({
		heading: 'Gianni Gambetti',
		tagline: 'About Me',

		contentView: Ember.View.extend( templateLoader, {
			classNames: [ 'about' ],
			templateUrl: 'template/about.html',
			contentBinding: Ember.Binding.oneWay('parentView.content'),
			didInsertElement:function(){
				$('abbr.timeago').timeago();
			}
		})

	});

	return view;
});