(function (App) {
	kik.metrics.enableGoogleAnalytics('UA-41660805-3', null, true);

	if (kik.browser) {
		kik.browser.setOrientationLock('portrait');
	}
	try {
		kik.browser.statusBarTransparent('black');
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