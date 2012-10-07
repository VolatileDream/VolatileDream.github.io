define([
  'lib/ember',
  'lib/jquery'
],function( Ember, $ ){

    var view= Ember.View.extend({
      didInsertElement: function(){

      	// re-run the enter state of the currentroute
      	// this works around some issues with the
      	// navtab controller
        App.router.currentState.enter( App.router );
      }
    });
  
  return view;
});