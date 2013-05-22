define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {

	var PersonModel = Backbone.Model.extend({
		defaults: {
			id: 0,
			name: 'Name',
			image: '/public/images/defaultProfile.png',
			gender: '',
			eyes: '',
			hairColour: '',
			hairLength: '',
			glasses: false,
			hat: false,
			nose: '',
			ears: '',
			facialHair: '',
			selected: false,
			visible: true
		}		
	});

	return PersonModel;

});