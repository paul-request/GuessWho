define([
	'jquery',
	'underscore',
	'backbone',
	'utils/TemplateUtils',
	'text!templates/FilterTemplate.html'
], 

function($, _, Backbone,
	TemplateUtils,
	FilterTemplate) {

	var FilterView = Backbone.View.extend({
		
		className: 'filterGroup',
		
		template: FilterTemplate,

		render: function() {
			var tmpl = _.template( this.template );
			this.$el.html( tmpl( this.options ) );
			
			return this;
		}
		
	});

	return FilterView;

});