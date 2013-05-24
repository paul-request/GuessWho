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
			this.currentFilters = [];
			this.count = 0;
		},
		
		update: function( prop, value ) {
			
			// create filter array if it doesnt already exist
			// TODO: use extend instead
			if ( !this.currentFilters[prop] ) {
				this.currentFilters[prop] = {};
			}
			
			// Make a copy of the collection to manipulate
			var updated = this.clone();
			
			// Add the current filter to the list of applied filters
			if ( this.selectedModel.get(prop) === value ) {
				this.currentFilters[prop][value] = true;
			} else {
				this.currentFilters[prop][value] = false;
			}
			
			updated = _.map( updated.models, $.proxy( function(  model ) {
				// Only check models that are visible and are not selected
				if ( this.selectedModel.get('id') !== model.get('id') && model.get('visible') === true ) {
					// TODO: test that this works as opposed to the 2 if statements
					// if selected has prop but model does not, then hide model OR
					// if selected does not have prop and model does, then hide model
					if ((this.selectedModel.get(prop) === value && model.get( prop ) !== value) ||
						(this.selectedModel.get(prop) !== value && model.get( prop ) === value )) {
						model.set({visible: false},{silent: true});
						model.trigger('change:visibility');
					} 
					
					// do we need this as we are already checking for truth above?
					//else {
					//	model.set({visible: true},{silent: true});
					//}
					/*
					if selected has prop and so does model, then show model OR
					if selected does not have prop and model does, then hide model
					if ((this.selectedModel.get(prop) === value && model.get( prop ) === value) ||
						(this.selectedModel.get(prop) !== value && model.get( prop ) !== value)) {
						model.set({visible: true},{silent: true});
					}
					*/
				}
				
				return model;
				
			}, this ));
			
			// increment the count
			this.incrementCount();
			
			// trigger game update
			this.trigger('game:update');
		},
		
		postReset: function() {
			this.selectedModel = this.where({selected: true})[0];
			this.currentFilters = [];
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