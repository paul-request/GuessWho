require([
	'underscore', 
	'backbone',
	'routers/Router'], 
	
function( 
	_, 
	Backbone,
	Router) {

	router = new Router();
	
	//globally scoped event aggregator
	Vents = _.extend({}, Backbone.Events);
	
	Vents.bind("guess:correct", function() {
		router.guess( true );
	});
	
	Vents.bind("guess:incorrect", function() {
		router.guess( false );
	});
	
	Vents.bind("update:filters", function() {
		router.updateFitlers();
	});
	
	Vents.bind("reset:game", function() {
		Backbone.history.loadUrl( Backbone.history.fragment );
	});
	
	Backbone.history.start();
	
});