var unirest = require('unirest');

var BASE_URL = 'https://yoda.p.mashape.com/yoda';

exports.getYoloPirates = function (msg, callback) {
	var retVal = { err: false, translation: '' };

  unirest.get(encodeURI(BASE_URL+'?sentence='+msg))
    .headers({
      "X-Mashape-Authorization": "YQWC3AJdS3h3AkqHHCaCmGjyuIkXyNj6"
    })
    .end(function (response) {
      retVal.translation = response.body;
      callback(retVal);
    });

}
