App.populator ('message', function ($page, data) {
	console.log(data);
	var $pirateBox = $page.querySelector('.translated-message'),
		$backButton = $page.querySelector('.button-back'),
		$fwdButton = $page.querySelector('.button-send');

	$pirateBox.innerText = data.msg;

	$backButton.addEventListener('click', function() {
		App.back();
	});

	$fwdButton.addEventListener('click', function() {
		if (kik.send) {
			kik.send({
				title: 'Yolo Pirate Message',
				text: data.msg,
				data: { msg: data.msg }
			});
		}
	});


});