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
			
			if ( !this.currentFilters[prop] ) {
				this.currentFilters[prop] = {};
			}
			
			var updated = this.clone();
			
			if ( this.selectedModel.get(prop) === value ) {
				this.currentFilters[prop][value] = true;
			} else {
				this.currentFilters[prop][value] = false;
			}
			
			updated = _.map( updated.models, $.proxy( function(  model ) {
				// Only check models that are visible and are not selected
				if ( this.selectedModel.get('id') !== model.get('id') && model.get('visible') === true ) {
					// if selected has prop but model does not, then hide model OR
					// if selected does not have prop and model does, then hide model
					if ((this.selectedModel.get(prop) === value && model.get( prop ) !== value) ||
						(this.selectedModel.get(prop) !== value && model.get( prop ) === value )) {
						model.set({visible: false},{silent: true});
					} 
					
					// if selected has prop and so does model, then show model OR
					// if selected does not have prop and model does, then hide model
					if ((this.selectedModel.get(prop) === value && model.get( prop ) === value) ||
						(this.selectedModel.get(prop) !== value && model.get( prop ) !== value)) {
						model.set({visible: true},{silent: true});
					} 
				}
				
				return model;
				
			}, this ));
			
			this.incrementCount();
			
			this.reset( updated );
		},
		
		postReset: function() {
			this.selectedModel = this.where({selected: true})[0];
		},
		
		incrementCount: function() {
			this.count++;
		}
		
	});

	return PersonCollection;

});