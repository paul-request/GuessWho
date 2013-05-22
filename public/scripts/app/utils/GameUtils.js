define(['underscore'], function( _ ) {
		
	return {
		
		select: function( num ) {
			var min = 1, max = num;
			return Math.floor(Math.random() * (max - min + 1));
		}
	
	}
});