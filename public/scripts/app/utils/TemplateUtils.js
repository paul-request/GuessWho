define(['jquery','underscore'], 

function( $, _ ) {
	

	//Template Utils which extend Backbone
	_.mixin({
	
		out : function( str ) {
			var string = str.toLowerCase();
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	
	});


});
