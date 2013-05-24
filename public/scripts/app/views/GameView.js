define([
	'jquery',
	'underscore',
	'backbone',
	'views/PersonView'
], 

function($, _, Backbone,
	PersonView) {

	var GameView = Backbone.View.extend({
		
		initialize: function( opts ) {
			this.setElement( $(opts.el) );
			this.personViews = [];
		},
		
		preRender: function() {
			this.close();
			// Create the person views
			_.each( this.collection.models, function ( person ) {
				var personView = new PersonView({ 
					model: person
				});
				this.personViews.push( personView );
			}, this );
			
			// Now render the child views
			this.render();
		},
		
		render: function() {			
			// Render each of the people
			_.each( this.personViews, function ( person ) {
				this.$el.append( person.render().$el );
			}, this );
		},
		
		close: function() {
			this.personViews = [];
			this.$el.unbind();
			this.$el.empty();
		}
		
	});

	return GameView;

});