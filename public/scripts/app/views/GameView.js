define([
	'jquery',
	'underscore',
	'backbone',
	'views/PersonView',
	'views/FiltersView',
	'text!templates/GameTemplate.html'
], 

function($, _, Backbone,
	PersonView,
	FiltersView,
	GameTemplate) {

	var GameView = Backbone.View.extend({
		
		template: GameTemplate,
		
		initialize: function( opts ) {
			this.setElement( $(opts.el) );
			this.personViews = [];
		},
		
		preRender: function() {
			this.reset();
			// Create the person views
			_.each( this.collection.models, function ( person ) {
				var personView = new PersonView({ 
					model: person
				});
				this.personViews.push( personView );
			}, this );
			
			// Create sidebar filters
			this.filters = new FiltersView({
				collection: this.collection
			});
			
			// Now render the child views
			this.render();
		},
		
		render: function() {
			var tmpl = _.template( this.template );
			this.$el.html( tmpl() );
			
			var $fragment = this.$el.find('#gameBoard');
			
			// Render each of the people
			_.each( this.personViews, function ( person ) {
				$fragment.append( person.render().$el );
			}, this );
			
			// Render the filters
			this.$el.find('#sideBar').html( this.filters.render().$el );
		},
		
		reset: function() {
			this.personViews = [];
			this.$el.unbind();
			this.$el.find('#gameBoard').empty();
			
			// maybe need to call close on other views to destory them, or does resetting the html do all?
		}
		
	});

	return GameView;

});