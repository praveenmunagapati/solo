$(function(){
  
  var supportMsg = document.getElementById('supportMessage');
  var voiceSelect = document.getElementById('voice');
  var volume = document.getElementById('volume');
  var rate = document.getElementById('rate');
  var pitch = document.getElementById('pitch');

  var $form = $('.cleverbotForm');
  var $input = $('.query');
  var $thinking = $('.thinking');
  var $speechInput = $('.speech-input');

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

  var askQuestion = function(question) {
    thinkingShow();
    $.ajax({
      type: 'POST',
      url: $SCRIPT_ROOT + 'chat',
      data: question || $form.serialize(),
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

  $speechInput.on('click', function(e){
    e.preventDefault();
    var message;
    var recognition = new webkitSpeechRecognition();
    recognition.start();
    recognition.onresult = function(e) {
      console.log(e.results[0][0].transcript);
      message = e.results[0][0].transcript;
      askQuestion('query='+message);
    };
  });

  var init = function() {
    checkCompatibility();
    loadVoices();
  };
  init();

});
