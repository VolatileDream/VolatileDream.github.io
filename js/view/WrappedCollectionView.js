define([
	'lib/ember'
],function( Ember ){
	
	var view = Ember.View.extend({
		// stuff that should be overriden

		itemViewClass: Ember.View,
		emptyView: Ember.View,

		headerView: Ember.View,
		footerView: Ember.View,


		// private stuff
		// TODO eventually add bindings to the collection
		// view for all the other things that it can have.

		template: Ember.Handlebars.compile('{{view view.headerView}}{{view view.collectionView}}{{view view.footerView}}'),

		collectionView: Ember.CollectionView.extend({
			emptyViewBinding: Ember.Binding.oneWay('parentView.emptyView'),
			itemViewClassBinding: Ember.Binding.oneWay('parentView.itemViewClass'),
			contentBinding: Ember.Binding.oneWay('parentView.content')
		})

	});

	/*

	// Demo to prove that WrappedCollectionView works

	function view( template ){
		return Ember.View.extend({
			template: Ember.Handlebars.compile( template )
		});
	}

	var view = wCollectionView.extend({
		content: ['a','b','c']
		,emptyView: view( 'Empty...' )
		,itemViewClass: view( 'some stuff: {{view.content}}')
		,headerView: view( 'I come before...')
		,footerView: view( 'And I come after')
	});

	*/
	return view;
});