var http = require('http');

var BASE_URL = 'http://isithackday.com/arrpi.php';

exports.getYoloPirates = function (msg, callback) {
	var retVal = { err: false, translation: '' };

	http.get(encodeURI(BASE_URL+'?text='+msg), function (res) {
		var pageData = "";
		res.on('data', function (chunk) {
			pageData += chunk;
		});

		res.on('end', function() {
			console.log("Success: " + pageData);
			retVal.translation = pageData;
			callback(retVal);
		});

	}).on('error', function (e) {
		console.log("Got error: " + e.message);
		retVal.err = true;
		callback(retVal);
	});
}

