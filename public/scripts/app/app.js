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
		console.log('CORRECT');
	});
	
	Vents.bind("guess:incorrect", function() {
		console.log('INCORRECT');
	});
	
	Vents.bind("game:start", function() {
		router.navigate('/');
	});
	
	Backbone.history.start();
	
});