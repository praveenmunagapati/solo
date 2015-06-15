var $form = $('.cleverbotForm');
var $input = $('.query');

$form.on('submit', function(e){
  e.preventDefault();
  askQuestion();
  console.log($form.serialize());

  function askQuestion() {
    // Query paramater must be a string
    $.ajax({
      type: 'POST',
      url: $SCRIPT_ROOT + 'chat',
      data: $form.serialize(),
      success: function(result){
        var result = JSON.parse(result);
        console.log(result.message)
      },
      fail: function(error) {
        console.log(error);
      }
    });
  };

});