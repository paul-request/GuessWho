define([
	'jquery',
	'underscore',
	'backbone',
	'views/GameView',
	'views/FiltersView',
	'collections/PersonCollection',
],
 
function( 
	$, _, Backbone,
	GameView,
	FiltersView,
	PersonCollection) {

	var Router = Backbone.Router.extend({
				
		routes : {
			"guess-who": "game"
		},
						
		game : function() {
			var 
			personCollection = new PersonCollection(),
			//filtersView = new FiltersView({
			//	collection: personCollection,
			//	el: '#container'
			//}),
			gameView = new GameView({
				collection: personCollection,
				el: '#container'
			});
			
			personCollection.once( "reset", personCollection.postReset, personCollection );
			//personCollection.once( "reset", filtersView.render, filtersView );
			personCollection.on( "reset", gameView.preRender, gameView );
			
			personCollection.fetch();
		}
	});
	
	return Router;

});
	