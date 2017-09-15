var http = require("http");
var express = require('express');
var fs = require("fs");
var path = require("path");

var app = express();

//app.use(express.static('public'));
//app.use('/static', express.static('public'));

//app.use('/static', express.static(__dirname + '/public'));

app.use(express.static(__dirname));

app.get('/', function(req, res){

	fs.readFile ('./test.html', function(err,data){
		res.writehead(200, {'content-Type':'text/html'});
		res.end(data);
	} );
});


http.createServer(app).listen( 3000, function(){ 
	console.log('ok'); 
});