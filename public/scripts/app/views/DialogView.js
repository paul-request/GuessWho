define([
	'jquery-ui',
	'underscore',
	'backbone',
	'utils/TemplateUtils',
	'text!templates/DialogTemplate.html'
], 

function($, _, Backbone,
	TemplateUtils,
	DialogTemplate) {
	
	var DEFAULTS = {
		modal : true,
		resizable: false,
		draggable: false,
		closeOnEscape: false,
		width: 400,
		height: 300
	};
	
	var DialogView = Backbone.View.extend({
		
		template: DialogTemplate,
		
		events: {
			'click #continue': 'close'
		},
		
		preRender: function( options ) {
			this.options = options;
			this.render();
		},

		render: function( options ) {
			var tmpl = _.template( this.template );
			this.$el.html( tmpl( this.options ) );
			
			this.$el.dialog( DEFAULTS );
		},
		
		close: function() {
			this.$el.dialog('close');
			Vents.trigger('game:reset');
			
			return false;
		}
		
	});

	return DialogView;

});