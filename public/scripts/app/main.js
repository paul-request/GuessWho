require.config({
	baseUrl:'/scripts/app/',
	paths: {
		'jquery': '../lib/jquery',
		'jquery-ui': '../lib/jquery-ui.min',
		'underscore': '../lib/underscore',
		'backbone': '../lib/backbone',
		'text': '../lib/text'
	},
	shim: {
		"jquery-ui": {
			exports: "$",
			deps: ['jquery']
		}
	},
	deps: ["app"]
});