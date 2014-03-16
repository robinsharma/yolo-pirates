App.populator ('message', function ($page, data) {
	console.log(data);
	var $pirateBox = $page.querySelector('.translated-message'),
		$backButton = $page.querySelector('.back-button'),
		$fwdButton = $page.querySelector('.fwd-button');

	$pirateBox.innerText = data.msg;

	$backButton.addEventListener('click', function() {
		App.load('home', 'slide-right');
	});

	$fwdButton.addEventListener('click', function() {
		if (kik.send) {
			kik.send({
				title: 'message ye scurvy dog! Tap to open thar',
				pic: '/img/yolo_pirate.png',
				data: { msg: data.msg }
			});
		}
	});


});