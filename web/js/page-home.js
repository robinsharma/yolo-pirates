App.populator('home', function ($page) {
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


  $previewButton.addEventListener('click', function () {
      if (apiCallNeeded()) {
        turnOnSpinner($previewSpinner);
        piratizeMessage($textBox.value, function (pmsg) {
          turnOffSpinner($previewSpinner)
        });
      } else {
        turnOnSpinner($previewSpinner)
        setTimeout(function () {
          turnOffSpinner($previewSpinner)
        }, 500);
      }
    }
  );

  $sendButton.addEventListener('click', function () {
    if (apiCallNeeded()) {
      turnOnSpinner($sendSpinner)
      piratizeMessageAndSend($textBox.value, function () {
        turnOffSpinner($sendSpinner)
      });
    } else if ($textBox.value) {
      turnOnSpinner($sendSpinner)
      sendMessage($previewBox.innerText, function () {
        turnOffSpinner($sendSpinner)
      });
    } else {
    }
  });

  function apiCallNeeded() {
    return (($textBox.value) && (!previewed || (previewed && (previewText !== $textBox.value))));
  }

  function turnOnSpinner(spinner) {
    if (spinner === $sendSpinner) {
      $sendButtonText.innerText = '';
      $sendSpinner.classList.add('enabled');
    } else {
      $previewButtonText.innerText = '';
      $previewSpinner.classList.add('enabled');
    }
  }

  function turnOffSpinner(spinner) {
    if (spinner === $sendSpinner) {
      $sendButtonText.innerText = 'Send';
      $sendSpinner.classList.remove('enabled');
    } else {
      $previewButtonText.innerText = 'Preview';
      $previewSpinner.classList.remove('enabled');
    }
  }

  function piratizeMessage(msg, callback) {
    ArrPI.getYoloPirates(msg, function (data) {
      if (!data || data.err) {
        App.dialog ({
          title        : 'Connection Error',
          text         : 'Please check your connection before trying again.' ,
          okButton     : 'Try Again' , 
          cancelButton : 'Cancel'
        }, function (retry) {
          if (retry) {
            piratizeMessage(msg, callback);
          } else {
            callback();
          }
        });
      } else {
        callback(data.translation);
        updatePreview(data.translation);
      }
    });
  }

  function sendMessage(pmsg, callback) {
    if (kik.send) {
      kik.send({
        title: 'message ye scurvy dog! Tap to open thar!',
        pic  : '/img/yolo_pirate.png',
        data : { msg: pmsg }
      });
      callback();
    }
  }

  function piratizeMessageAndSend(msg, callback) {
    piratizeMessage(msg, function (pmsg) {
      if (pmsg) sendMessage(pmsg, callback);
    });
  }

  function updatePreview(msg) {
    if (msg) {
      $previewBox.innerText = msg;
      previewText = $textBox.value;
      previewed = true;
    }
  }

});

