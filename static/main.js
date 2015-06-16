$(function(){
  
  var supportMsg = document.getElementById('supportMessage');
  var voiceSelect = document.getElementById('voice');
  var volume = document.getElementById('volume');
  var rate = document.getElementById('rate');
  var pitch = document.getElementById('pitch');

  var $form = $('.cleverbotForm');
  var $input = $('.query');


  var loadVoices = function() {
    window.speechSynthesis.onvoiceschanged = function() {
      var voices = window.speechSynthesis.getVoices();
      voices.forEach(function(voice, i) {
        var option = document.createElement('option');
        option.value = voice.name;
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
    msg.rate = 1.0;

    // msg.volume = parseFloat(volume.value);
    // msg.rate = parseFloat(rate.value);
    // msg.pitch = parseFloat(pitch.value);

    // if (voiceSelect.value) {
    //   msg.voice = speechSynthesis.getVoices().filter(function(voice) { 
    //     return voice.name == voiceSelect.value; 
    //   })[0];
    // }
    msg.voice = 'en-US';

    window.speechSynthesis.speak(msg);
  }

  var askQuestion = function() {
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
        window.speechSynthesis.speak(new SpeechSynthesisUtterance({
          text: message,
          rate: 1.0,
          voice: 'en-US'
        }));
      },
      error: function(error) {
        alert(error);
      }
    });
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
  window.setInterval(function(){
    var msg = new SpeechSynthesisUtterance('hello');
    msg.text='dicks';
    msg.volume=1.0;
    msg.lang='en-US';
    msg.rate=1.0;
    msg.pitch=1.0;
    window.speechSynthesis.speak(msg);
  }, 500)