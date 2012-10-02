define([
  'ember',
  'jquery',
  'module/info'
],function( Ember, $, InfoController ){

  var obj = {
    
    controller: Ember.ObjectController.extend({
      content: {}
    }),

    view: Ember.View.extend({
      templateName: "app",
      didInsertElement: function(){
        App.router.currentState.enter( App.router );
      }
    })

  };
  
  return obj;
});