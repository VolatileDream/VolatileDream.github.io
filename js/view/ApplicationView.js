define([
  'lib/ember',
  'lib/jquery',
  'view/NavigationTabView'
],function( Ember, $, NavigationTabView ){

    var view= Ember.View.extend({
      template: Ember.Handlebars.compile('{{view view.NavigationTabView}}{{outlet}}'),

      NavigationTabView: NavigationTabView,

      didInsertElement: function(){

        $('abbr.timeago').timeago();

      	// re-run the enter state of the currentroute
      	// this works around some issues with the
      	// NavigationTabView controller
        App.router.currentState.enter( App.router );
      }
    });
  
  return view;
});