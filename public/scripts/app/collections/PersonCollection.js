define([
	'jquery',
	'underscore',
	'backbone',
	'models/PersonModel'
], 
function($, _, Backbone, 
	PersonModel) {

	var PersonCollection = Backbone.Collection.extend({
		
		model: PersonModel,
		
		url: "/people",
		
		initialize: function() {
			this.selectedModel = {};
			this.currentFilters = {};
			this.count = 0;
		},
		
		update: function( prop, value ) {

			var 
			matched = (this.selectedModel.get(prop) === value) ? true : false,
			updated = this.clone();
			
			// create filter array if it doesn't already exist
			if ( !this.currentFilters[prop] ) {
				this.currentFilters[prop] = {};
			}
			
			// Add the current filter to the list of applied filters
			this.currentFilters[prop][value] = matched;

			updated = _.map( updated.models, $.proxy( function(  model ) {
				// Only check models that are visible and are not selected
				if ( this.selectedModel.get('id') !== model.get('id') && model.get('visible') === true ) {
					// if selected has prop but model does not, then hide model OR
					// if selected does not have prop and model does, then hide model
					if ((this.selectedModel.get(prop) === value && model.get( prop ) !== value) ||
						(this.selectedModel.get(prop) !== value && model.get( prop ) === value )) {
						model.set({visible: false},{silent: true});
						model.trigger('change:visibility');
					} 
				}
				
				return model;
				
			}, this ));
			
			// increment the count
			this.incrementCount();
			
			// trigger game update
			Vents.trigger('update:filters');
		},
		
		postReset: function() {
			this.selectedModel = this.where({selected: true})[0];
			this.currentFilters = {};
			this.count = 0;
		},
		
		incrementCount: function() {
			this.count++;
		},
		
		getCount: function() {
			return this.count;
		},
		
		getSelectedModel: function() {
			return this.selectedModel;
		}
		
	});

	return PersonCollection;

});