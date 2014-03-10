App.populator( 'home', function ($page) {
	var previewText,
		$textBox        = $page.querySelector('.message-box'),
		$sendButton     = $page.querySelector('.send-button'),
		$previewButton  = $page.querySelector('.preview-button'),
		$previewBox     = $page.querySelector('.preview-text'),
		previewed       = false;

	$previewButton.addEventListener('click', function() {
		if ($textBox.value) {
			if (previewed) {
				if (previewText !== $textBox.value) {
					$page.querySelector('.preview-spinner').style.display = 'block';
					piratizeMessage($textBox.value, function (pmsg) {
						$page.querySelector('.preview-spinner').style.display = 'none';
						if (pmsg) {
							$previewBox.innerText = previewText = pmsg;
						}
					});
				}
			} else {
				previewed = true;
				$page.querySelector('.preview-spinner').style.display = 'block';
				piratizeMessage($textBox.value, function (pmsg) {
					$page.querySelector('.preview-spinner').style.display = 'none';
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
					$page.querySelector('.preview-spinner').style.display = 'block';
					piratizeMessageAndSend($textBox.value);
					$page.querySelector('.preview-spinner').style.display = 'none';
				} else {
					kik.send({ title: 'Yolo Pirate Message', text: previewText, data: { msg: previewText }  });
				}
			} else {
				$page.querySelector('.preview-spinner').style.display = 'block';
				piratizeMessageAndSend($textBox.value);
				$page.querySelector('.preview-spinner').style.display = 'none';
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

function piratizeMessageAndSend (msg) {
	piratizeMessage(msg, function (pmsg) {
		if (pmsg) {
			kik.send({
				title: 'Yolo Pirate Message',
				text: pmsg,
				data: { msg: pmsg }
			});
		}
	});
}