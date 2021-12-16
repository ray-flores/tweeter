/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() { //call jQuery with obj from request
  
  //let tweetWords = $(this).val();
  //function should return $tweet to the caller
  //construct new element with $: const $tweet = $(`<article class="tweet">Hello world</article>`);


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweetArr) {
    for (let tweeter of tweetArr) {
      const $tweet = createTweetElement(tweeter);
      $('.container').append($tweet);
    }
    
  }

  
  const createTweetElement= function(tweetObj) {
    const time = timeago.format(tweetObj.created_at); 
    const tweet = $(`
    <article class="container2">
        <header id="tweets">
          <img src=${tweetObj.user.avatars} alt="Avatar" class="tweet-header">
          <span class="tweet-header">${tweetObj.user.name}</span>
          <span id="AT"><b>${tweetObj.user.handle}</b></span>
        </header>
        <footer class="tweets">
          <p>${tweetObj.content.text}</p>
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
  }

  // const $tweet = createTweetElement(tweetData);
  // console.log($tweet); // to see what it looks like
  // $('.container').append($tweet);


  renderTweets(data);


});