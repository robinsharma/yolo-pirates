(function (App) {
	if (kik.message) {
		App.load('message', kik.message);
	} else {
		App.load('home');
	}

	//TODO: Flow
	
	// try {
	// 	App.restore();
	// } catch (err) {
	// 	App.load('home');
	// }
}) (App);