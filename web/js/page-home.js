App.populator( 'home', function ($page) {
	var previewText,
		$textBox           = $page.querySelector('.message-box'),
		$sendButton        = $page.querySelector('.send-button'),
		$sendButtonText    = $sendButton.querySelector('.button-text'),
		$previewButton     = $page.querySelector('.preview-button'),
		$previewButtonText = $previewButton.querySelector('.button-text'),
		$previewBox        = $page.querySelector('.preview-text'),
		$previewSpinner    = $previewButton.querySelector('.spinner'),
		$sendSpinner       = $sendButton.querySelector('.spinner'),
		previewed          = false;

	$previewButton.addEventListener('click', function() {
		if ($textBox.value) {
			if (previewed) {
				if (previewText !== $textBox.value) {
					$previewButtonText.innerText = '';
					$previewSpinner.classList.add('enabled');
					piratizeMessage($textBox.value, function (pmsg) {
						$previewButtonText.innerText = 'Preview';
						$previewSpinner.classList.remove('enabled');
						if (pmsg) {
							$previewBox.innerText = previewText = pmsg;
						}
					});
				}
			} else {
				previewed = true;
				$previewButtonText.innerText = '';
				$previewSpinner.classList.add('enabled');
				piratizeMessage($textBox.value, function (pmsg) {
					$previewButtonText.innerText = 'Preview';
					$previewSpinner.classList.remove('enabled');
					if (pmsg) {
						$previewBox.innerText = previewText = pmsg;
					}
				});
			}
		}
	});

	$sendButton.addEventListener('click', function(){
		if (kik.send && $textBox.value) {
			if (previewed) {
				if (previewText !== $textBox.value) {
					$sendButtonText.innerText = '';
					$sendSpinner.classList.add('enabled');
					piratizeMessageAndSend($textBox.value, function () {
						$sendButtonText.innerText = 'Send';
						$sendSpinner.classList.remove('enabled');
					});
				} else {
					kik.send({ title: 'Yolo Pirate Message', text: previewText, data: { msg: previewText }  });
				}
			} else {
				$sendButtonText.innerText = '';
				$sendSpinner.classList.add('enabled');
				piratizeMessageAndSend($textBox.value, function () {
					$sendButtonText.innerText = 'Send';
					$sendSpinner.classList.remove('enabled');
				});
			}
		}
	});
});

function piratizeMessage (msg, callback) {
	ArrPI.getYoloPirates(msg, function (data) {
		if (data.err) {
			//TODO
			console.log('Error: ' + data.err);
			callback();
		} else {
			console.log('Pirate msg: ' + data.translation);
			callback(data.translation);
		}
	});
}

function piratizeMessageAndSend (msg, callback) {
	piratizeMessage(msg, function (pmsg) {
		if (pmsg) {
			kik.send({
				title: 'Yolo Pirate Message',
				text: pmsg,
				data: { msg: pmsg }
			});
		}
		callback();
	});
}