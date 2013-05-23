define([
	'jquery',
	'underscore',
	'backbone',
	'views/FilterView',
	'utils/TemplateUtils',
	'text!templates/FiltersTemplate.html'
], 

function($, _, Backbone,
	FilterView,
	TemplateUtils,
	FiltersTemplate) {

	var FiltersView = Backbone.View.extend({

		template: FiltersTemplate,
		
		events: {
			'click .filterGroup': 'update'
		},
		
		preRender: function() {
			
			var filters = {
				'eyes': 'Eye colour',
				'hairColour': 'Hair colour',
				'hairLength': 'Hair Length',
				'facialHair': 'Facial Features'
			}
			
			this.filterViews = [];
			
			_.each( filters, $.proxy( function( val, key ) {
				this.filterViews.push( new FilterView({
			    	name: val,
			    	key: key,
			    	values: _.uniq( this.collection.pluck( key ) ),
			    	selected: this.collection.currentFilters[key]
			    }) )
			}, this ));
			
			this.render();
		},

		render: function() {
			
			var tmpl = _.template( this.template );
			this.$el.html( tmpl( {count: this.collection.count } ) );
			
			_.each( this.filterViews, function ( filter ) {
				this.$el.append( filter.render().$el );
			}, this );
			
			return this;
		},
		
		update: function( evt ) {
			var 
			$evtTarget = $(evt.target),
			$target = ( evt.target.nodeName !== 'A' ) ?
				$evtTarget.closest('a') : $evtTarget;			
			
			this.collection.update( $target.data('key'), $target.data('value') );
			
			return false;
		}
		
	});

	return FiltersView;

});