var unirest = require('unirest');

var BASE_URL = 'https://yoda.p.mashape.com/yoda';
var TIMEOUT  = 20*1000;

exports.getYoloPirates = function (msg, callback) {
	var retVal = { err: false, translation: '' };

	var completed = false;

	unirest.get(encodeURI(BASE_URL+'?sentence='+msg))
	.headers({
		"X-Mashape-Authorization": "YQWC3AJdS3h3AkqHHCaCmGjyuIkXyNj6"
	})
	.end(function (response) {
		console.log(response);
		if (response.error) {
			completed = true;
			callback();
		}
		retVal.translation = response.body;
		completed = true;
		callback(retVal);
	});

	setTimeout( function () {
		if(!completed) {
			callback();
			return;
		}
	}, TIMEOUT);

}
