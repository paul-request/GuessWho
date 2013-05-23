	// Module dependencies.
var application_root = __dirname,
    express = require("express"), //Web framework
    path = require("path"), //Utilities for dealing with file paths
    fs = require("fs");

//Create server
var app = express();

// Configure server
app.configure(function () {
    app.use(express.bodyParser()); //parses request body and populates req.body
    app.use(express.methodOverride()); //checks req.body for HTTP method overrides
    app.use(app.router); //perform route lookup based on url and HTTP method
    app.use(express.static(application_root)); //Where to serve static content
	app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true })); //Show all errors in development
});

//Start server
app.listen(8081, function () {
    console.log("Express server listening on port 8081");
});

app.get('/people', function(req, res) {
	var data = [
		{id:'1',image:'/public/images/paul.jpg',name: 'Paul',gender:'MALE',eyes:'BLUE',hairColour:'BLONDE',hairLength:'SHORT',glasses: false,hat: false,nose: 'LARGE',ears: 'LARGE'},
		{id:'2',image:'/public/images/andy.jpg',name: 'Andy',gender:'MALE',eyes:'GREEN',hairColour:'BROWN',hairLength:'SHORT',glasses: true,hat: false,nose: 'SMALL',ears: 'SMALL',facialHair:'MOUSTACHE'},
		{id:'3',image:'/public/images/mark.jpg',name: 'Mark',gender:'MALE',eyes:'BROWN',hairColour:'BLACK',hairLength:'SHORT',glasses: false,hat: true,nose: 'SMALL',ears: 'LARGE',facialHair:'BEARD'},
		{id:'4',image:'/public/images/gina.jpg',name: 'Gina',gender:'FEMALE',eyes:'GREEN',hairColour:'BROWN',hairLength:'LONG',glasses: false,hat: false,nose: 'SMALL',ears: 'SMALL'},
		{id:'5',image:'/public/images/tony.jpg',name: 'Tony',gender:'MALE',eyes:'BROWN',hairColour:'BLACK',hairLength:'SHORT',glasses: false,hat: false,nose: 'LARGE',ears: 'LARGE',facialHair:'BEARD'},
		{id:'6',image:'/public/images/aaron.jpg',name: 'Aaron',gender:'MALE',eyes:'GREEN',hairColour:'BROWN',hairLength:'SHORT',glasses: true,hat: false,nose: 'SMALL',ears: 'SMALL'},
		{id:'7',image:'/public/images/trevor.jpg',name: 'Trevor',gender:'MALE',eyes:'BLUE',hairColour:'BROWN',hairLength:'SHORT',glasses: false,hat: true,nose: 'SMALL',ears: 'LARGE'},
		{id:'8',image:'/public/images/lisa.jpg',name: 'Lisa',gender:'FEMALE',eyes:'BLUE',hairColour:'BLONDE',hairLength:'LONG',glasses: false,hat: false,nose: 'SMALL',ears: 'SMALL'},
		{id:'9',image:'/public/images/steve.jpg',name: 'Steve',gender:'MALE',eyes:'BROWN',hairColour:'BLACK',hairLength:'SHORT',glasses: false,hat: false,nose: 'LARGE',ears: 'LARGE',facialHair:'BEARD'},
		{id:'10',image:'/public/images/anshul.jpg',name: 'Anshul',gender:'MALE',eyes:'GREEN',hairColour:'BROWN',hairLength:'SHORT',glasses: true,hat: false,nose: 'SMALL',ears: 'SMALL'},
		{id:'11',image:'/public/images/dinah.jpg',name: 'Dinah',gender:'FEMALE',eyes:'BROWN',hairColour:'BLACK',hairLength:'LONG',glasses: false,hat: true,nose: 'SMALL',ears: 'SMALL'},
		{id:'12',image:'/public/images/jerome.jpg',name: 'Jerome',gender:'MALE',eyes:'BLUE',hairColour:'BLACK',hairLength:'SHORT',glasses: false,hat: false,nose: 'SMALL',ears: 'SMALL'}
	];
	
	var selectedIndex = Math.floor(Math.random() * (data.length))
	
	data[selectedIndex].selected = true;
	
	res.send( data );	
});

// In here we need to keep track of a session probably
// then we can store attempts and player on that session
// needREST urkls that do the filtering and send the new set back
// or send the whole set but update the visible flag
