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
	
	Vents.bind("game:reset", function() {
		router.navigate('#/guess-who', true);
	});
	
	Backbone.history.start();
	
});