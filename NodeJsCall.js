let https = require ('https');

var subscription_key = '6ac6b78cf84d4bcfb30379fa9fbae5de';
var endpoint = "https://text-sentiment.cognitiveservices.azure.com/";

let path = '/text/analytics/v2.1/sentiment';

const CallApi = function(data, callback){

	let response_handler = function (response) {
	    let body = '';

	    response.on('data', function (d) {
	        body += d;
	    });
	    response.on('end', function () {
	        let body_ = JSON.parse(body);
	        let body__ = JSON.stringify(body_, null, '  ');
	        return callback(body__);
	    });
	    response.on('error', function (e) {
	        console.log('Error: ' + e.message);
	    });
	};

	let request_params = {
	    method: 'POST',
	    hostname: (new URL(endpoint)).hostname,
	    path: path,
	    headers: {
	        'Ocp-Apim-Subscription-Key': subscription_key,
	    }
	};

	req = https.request(request_params, response_handler);
    req.write(data);
    req.end();
}

module.exports.callApi = CallApi;


