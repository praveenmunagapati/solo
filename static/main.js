$(function(){
  
  var supportMsg = document.getElementById('supportMessage');
  var voiceSelect = document.getElementById('voice');
  var volume = document.getElementById('volume');
  var rate = document.getElementById('rate');
  var pitch = document.getElementById('pitch');

  var $form = $('.cleverbotForm');
  var $input = $('.query');
  var $thinking = $('.thinking');

  var loadVoices = function() {
    window.speechSynthesis.onvoiceschanged = function() {
      var voices = window.speechSynthesis.getVoices();
      voices.forEach(function(voice, i) {
        var option = document.createElement('option');
        option.value = i;
        option.innerHTML = voice.name;        
        voiceSelect.appendChild(option);
      });
    };
  };

  var checkCompatibility = function() {
    if ('speechSynthesis' in window) {
      supportMsg.innerHTML = 'Your browser <strong>supports</strong> speech synthesis.';
    } else {
      supportMsg.innerHTML = 'Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="http://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.';
      supportMsg.classList.add('not-supported');
    }
  };

  var speak = function(text) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[$(voiceSelect).val()];
    msg.volume = 1.0;
    msg.pitch = 1.0;
    msg.rate = 1.0;

    window.speechSynthesis.speak(msg);
  };

  var askQuestion = function() {
    thinkingShow();
    $.ajax({
      type: 'POST',
      url: $SCRIPT_ROOT + 'chat',
      data: $form.serialize(),
      success: function(result){
        var result = JSON.parse(result);
        console.log(result.message);
        // speak(result.message.toString());
      },
      complete: function(response) {
        var message = JSON.parse(response.responseText).message;
        speak(message);
        thinkingHide();
      },
      error: function(error) {
        alert(error);
      }
    });
  };
  var thinkingShow = function(){
    $thinking.show();
  };
  var thinkingHide = function(){
    $thinking.hide();
  };

  $form.on('submit', function(e){
    e.preventDefault();
    askQuestion();
    $input.val('');
  });

  var init = function() {
    checkCompatibility();
    loadVoices();
  };
  init();

});
