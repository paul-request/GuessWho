define([
	'jquery',
	'underscore',
	'backbone',
	'views/GameView',
	'views/FiltersView',
	'views/DialogView',
	'collections/PersonCollection',
],
 
function( 
	$, _, Backbone,
	GameView,
	FiltersView,
	DialogView,
	PersonCollection) {

	var Router = Backbone.Router.extend({
				
		routes : {
			"guess-who": "game"
		},
						
		game : function() {
			// create collection
			if ( typeof this.personCollection === 'undefined'  ) {
				this.personCollection = new PersonCollection();
			}
			
			// create the view of the game
			if ( typeof this.gameView === 'undefined'  ) {
				this.gameView = new GameView({
					collection: this.personCollection,
					el: '#gameBoard'
				});
			}
			
			// create the game filters
			if ( typeof this.filtersView === 'undefined'  ) {
				this.filtersView = new FiltersView({
					collection: this.personCollection,
					el: '#sideBar'
				})
			}
			
			//create the dialog message
			if ( typeof this.dialogView === 'undefined'  ) {
				this.dialogView = new DialogView({
					collection: this.personCollection
				});
			}
			
			this.personCollection.once('reset', this.personCollection.postReset, this.personCollection);
			this.personCollection.on('reset', this.gameView.preRender, this.gameView);
			this.personCollection.on('reset', this.filtersView.preRender, this.filtersView);

			this.personCollection.fetch({cache: false});
		},
		
		guess: function( outcome ) {
			this.personCollection.incrementCount();
			Vents.trigger('update:filters');
			
			var 
			selectedName = this.personCollection.getSelectedModel().get('name'),
			guessCount = this.personCollection.getCount(),
			dialogMsg = 'You correctly guessed ' + 
				selectedName + ' in ' + guessCount + ' guesses.';
			
			// If person is correctly guessed
			if ( outcome === true ) {
				this.dialogView.preRender({
					title: 'Correct!',
					message: dialogMsg
				});
			}
		},
		
		updateFitlers: function() {
			this.filtersView.preRender();
		}
	});
	
	return Router;

});
	