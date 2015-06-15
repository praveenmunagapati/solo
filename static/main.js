var $form = $('.cleverbotForm');
var $input = $('.query');

$form.on('submit', function(e){
  e.preventDefault();
  askQuestion();
  $input.val('');
});

function askQuestion() {
  $.ajax({
    type: 'POST',
    url: $SCRIPT_ROOT + 'chat',
    data: $form.serialize(),
    success: function(result){
      var result = JSON.parse(result);
      console.log(result.message)
    },
    error: function(error) {
      alert(error);
    }
  });
};