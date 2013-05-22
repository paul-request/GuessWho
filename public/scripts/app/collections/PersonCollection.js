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
			this.updateBoard( prop, value );
			this.currentFilters.push({prop: value});
		},
		
		updateBoard: function( prop, value ) {
			
			var updated = this.clone();
			
			updated = _.map( updated.models, $.proxy( function(  model ) {
				// if the selected person has the attribute
				// then then go in and hide anyone else who doesnt have the attribute
				if ( this.selectedModel.get(prop) === value && model.get( prop ) !== value ) {
					model.set({visible: false},{silent: true});
				} 
				
				// if the selected person does not have the attribute
				// then go throgh and hide ebryone that does  have that attribute
				if ( this.selectedModel.get(prop) !== value && model.get( prop ) === value ) {
					model.set({visible: false},{silent: true});
				}
				
				return model;
			}, this ));
			
			this.incrementCount();
			
			this.reset( updated );
		},
		
		postReset: function() {
			this.selectedModel = this._getSelectedModel();
		},
		
		incrementCount: function() {
			this.count++;
		},
		
		_getSelectedModel: function() {
			return this.where({selected: true})[0];
	    }
		
	});

	return PersonCollection;

});