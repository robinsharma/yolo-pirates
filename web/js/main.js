(function (App) {
	if (kik.browser) {
		kik.browser.setOrientationLock('portrait');
	}
	try {
		kik.browser.statusBarTransparent('white');
	} catch (err) {}

	if (kik.message) {
		App.load('message', kik.message);
	} else {
		try {
			App.restore();
		} catch (err) {
			App.load('home');
		}
	}
}) (App);