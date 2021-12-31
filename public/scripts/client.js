/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //protection against user text area input
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //adds new tweets in reverse chronological order
  const renderTweets = function(tweetArr) {
    // $('.container2').remove();
    for (let tweeter of tweetArr) {
      const $tweet = createTweetElement(tweeter);
      $('section').after($tweet);
    }
  };

  const createTweetElement = function(tweetObj) {
    const time = timeago.format(tweetObj.created_at);
    const tweet = $(`
    <article class="container2">
        <header id="tweets">
          <img src=${tweetObj.user.avatars} alt="Avatar" class="tweet-header">
          <span class="tweet-header">${tweetObj.user.name}</span>
          <span id="AT"><b>${tweetObj.user.handle}</b></span>
        </header>
        <footer class="tweets">
          <p>${escape(tweetObj.content.text)}</p>
        <div>
          <i id="iconic" class="fas fa-flag"></i>
          <i id="iconic" class="fas fa-retweet"></i>
          <i id="iconic" class="fas fa-heart"></i>
        </div>
        <span>${time}</span>
        </footer>
      </article>
    `);
    return tweet;
  };

  $('#button').on('click', function(event) {
    event.preventDefault(); //prevents browser page refresh
    let tweet = $('#tweet-text').val();
    if (tweet === null || tweet === "") { //checks if text area is blank and returns error message
      $('#alerts1').hide();
      $('#alerts2').hide();
      return $("#alerts1").slideDown("slow");
    } else if (tweet.length > 140) { //checks if text is too long and returns error message
      $('#alerts1').hide();
      $('#alerts2').hide();
      return $("#alerts2").slideDown("slow");
    } else {  //clears error messages if text is valid
      $('#alerts1').hide();   
      $('#alerts2').hide();
      $.ajax('/tweets', { method: 'POST', data: {text: tweet} })
        .then(function(res) {
          console.log('Success: ', res);
          loadTweets();
        });
    }
  });

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET', data: 'json'})
      .then(function(res) {
        renderTweets(res);
        $("#counter").text("140"); //resets form fields including character counter
        $("form").trigger("reset");
        $('.container2').replaceWith(renderTweets(res));
      });
  };

  loadTweets(); //allows tweets to persist after page refresh
  
});