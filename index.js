'use strict';

const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const apiCallFromNode = require('./NodeJsCall');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+'/public'));

app.post('/sentiment_check', (req, res, next) => {
	let review = req.body.review;
	let body = JSON.stringify({
		'documents': [
			{
				'id': '1',
				'language': 'en',
				'text': review
			}
		]
		
		});

	apiCallFromNode.callApi(body, function(response){
		res.write('<html><body><h2> Response from server: </h2><hr></body></html>'+response);
		res.end();
	});
  
});

const server = http.createServer(app);

server.listen(port, hostname, function() {
	console.log(`Hi Rohit, Server is runnning at http://${hostname}:${port}.`);
});