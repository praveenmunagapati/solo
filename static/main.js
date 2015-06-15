$('.cleverbot').on('submit', function(e){
  e.preventDefault();
  var query = $(this).serialize().replace('query=', '');
  // var q = $('.question').val();
  // console.log(q);
  // askQuestion(query);
  console.log(query);
  askQuestion(query);
  function askQuestion(query) {
    // Query paramater must be a string
    $.ajax({
      type: 'POST',
      url: $SCRIPT_ROOT + 'chat',
      // data: JSON.stringify({question: query}),
      data: 'hello',
      contentType: 'application/json;charset=UTF-8',
      success: function(result){
        console.log(result.message);
      },
      fail: function(error) {
        console.log(error);
      }
    });
  };
});