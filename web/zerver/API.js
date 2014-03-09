var https = require('https');

var BASE_URL = 'http://isithackday.com/arrpi.php';

exports.getYoloPirates = function (msg, callback) {
	http.get(encodeURI(base+'?text='+msg), function (res) {
		var pageData = "";
		res.on('data', function (chunk) {
			pageData += chunk;
		});

		res.on('end', function() {
			callback(pageData);
		});

	}).on('error', function (e) {
		console.log("Got error: " + e.message);
	});
}

