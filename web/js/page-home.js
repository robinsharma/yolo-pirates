App.populator( 'home', function ($page) {
	var $textBox    = $page.querySelector('.message-box'),
		$sendButton = $page.querySelector('.send-button');

	$sendButton.addEventListener('click', function(){
		API.getYoloPirates($textBox.value, function (data) {
			if (data.err) {
				//TODO
			} else {
				App.load('message', data);
			}
		});
	});
});