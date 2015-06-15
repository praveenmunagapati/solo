$('.cleverbotForm').on('submit', function(e){
  e.preventDefault();
  // var query = $(this).serialize();
  // console.log(query);
  askQuestion();

  function askQuestion() {
    // Query paramater must be a string
    $.ajax({
      type: 'POST',
      url: $SCRIPT_ROOT + 'chat',
      // data: JSON.stringify({question: query}),
      data: $('form').serialize(),
      // contentType: 'application/json;charset=UTF-8',
      // dataType: 'json',
      success: function(result){
        console.log(result);
      },
      fail: function(error) {
        console.log(error);
      }
    });
  };

});