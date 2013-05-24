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
				
		className: '.cardWrap',
		
		events: { 
			"click .card.visible:not(.toggle)" : "guess",
			"click .card.visible.toggle" : "turn"
		},

		template: PersonTemplate,
		
		initialize: function() {
			this.toggled = false;
			this.model.on('change:visibility', this.update, this);
		},
		
		render: function() {
			var tmpl = _.template( this.template );
			this.$el.html( tmpl( this.model.toJSON() ) );
			
			return this;
		},
		
		guess: function( evt ) {
			var $card = $(evt.currentTarget);
			$card.addClass('toggle');
			
			// Only trigger guess if card face is showing
			if ( !this.toggled ) {
				if ( this.model.get('selected') === true ) {
					Vents.trigger('guess:correct');
				} else {
					Vents.trigger('guess:incorrect');
				}
			}
			
			this.toggled = true;
			
			return false;
			
		},
		
		turn: function( evt ) {
			this.toggled = false;
			$(evt.currentTarget).removeClass('toggle');
			return false;
		},
		
		update: function( evt ) {
			this.$el.find('.card').addClass('hidden');
			return false;
		}
		
	});

	return PersonView;

});