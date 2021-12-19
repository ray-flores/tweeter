
$(document).ready(function() { //call jQuery with obj from request
  $('#tweet-text').on('keyup', function() {
    let tweet = $(this).val().length;
    let limit = 140 - tweet;
    if (limit < 0) {
      $('.counter').addClass('negative-numbers');
      $('.counter').css('color', 'red');
    }
    if (limit >= 0) {
      $('.counter').removeClass('negative-numbers');
      $('.counter').css('color', '#545149');
    }
    $('.counter').text(limit);
  });
});