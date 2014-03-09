App.populator ('message', function ($page, data) {
	console.log(data);
	var $pirateBox = $page.querySelector('TO-DO'),
		$homeButton = $page.querySelector('TO-DO'),
		$fwdButton = $page.querySelector('TO-DO');

	$pirateBox.value = data;

	$homeButton.addEventListener('click', function() {
		App.back();
	});

	$fwdButton.addEventListener('click', function() {
		if (kik.send) {
			kik.send({
				title: 'Yolo Pirate Message',
				text: data,
				data: { msg: data }
			});
		}
	});


});