define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/PersonTemplate.html',
	'utils/TemplateUtils'
], function($, _, Backbone,
	PersonTemplate,
	TemplateUtils) {

	var PersonView = Backbone.View.extend({
		
		events: { 
			"click .card.visible" : "guess"//,
			//"mouseover .card.visible" : "showDetails",
			//"mouseout .card.visible" : "hideDetails"
		},

		template: PersonTemplate,
		
		render: function() {
			var tmpl = _.template( this.template );
			this.$el.html( tmpl( this.model.toJSON() ) );
			
			return this;
		},
		
		guess: function( evt ) {
			var $card = $(evt.currentTarget);
			$card.toggleClass('toggle');
			
			this.model.collection.incrementCount();
			
			if ( this.model.get('selected') === true ) {
				Vents.trigger('guess:correct');
			} else {
				Vents.trigger('guess:incorrect');
			}
		},
		
		showDetails: function( evt ) {
			var $card = $(evt.currentTarget);
			$card.addClass('hover');
		},
		
		hideDetails: function( evt ) {
			var $card = $(evt.currentTarget);
			$card.removeClass('hover');
		}
		
	});

	return PersonView;

});