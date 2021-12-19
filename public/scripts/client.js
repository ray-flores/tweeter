/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() { //call jQuery with obj from request
  
  //let tweetWords = $(this).val();
  //function should return $tweet to the caller
  //construct new element with $: const $tweet = $(`<article class="tweet">Hello world</article>`);


  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweetArr) {
    $('.container2').remove(); //or empty() but this doesn't take away the element
    for (let tweeter of tweetArr) {
      const $tweet = createTweetElement(tweeter);
      $('.container').after($tweet); //prepend or after 
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
  }

  //ERROR

  // const errorBlank = $(`
  //   <div class="alert alert-danger" role="alert">
  //   The text field cannot be <strong> blank </strong>! Please write something.
  //   </div>`
  // )

  // const errorBlank = $(`
  //   <div class="alert alert-danger" role="alert">
  //   The text is <strong> too long </strong>! Please write something.
  //   </div>`
  // )


  //////
  

  $('#button').on('click', function(event) {
    event.preventDefault();
    let tweet = $('#tweet-text').val();
    if (tweet === null || tweet === "") {
      $('#alerts1').hide();
      $('#alerts2').hide();
      return $( "#alerts1" ).slideDown("slow");
      //return $("#alerts1").slideUp("slow");
      //return $("#alerts1").css("display", "inline");
      //return alert("The text field cannot be blank. Please write something.");
    } else if (tweet.length > 140) {
      $('#alerts1').hide();
      $('#alerts2').hide();
      return $( "#alerts2" ).slideDown( "slow" );
      //return $("#alerts2").css("display", "inline");
      //return alert("This text is too long. Please shorten it.")
    } else {
      $('#alerts1').hide();
      $('#alerts2').hide();
      $.ajax('/tweets', { method: 'POST', data: {text: tweet} })
      .then(function (res) {
        console.log('Success: ', res);
        loadTweets();
      });
    }
    
    
  });

  
  // $('#alerts1').hide();

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET', data: 'json'})
      .then( function (res) {
        renderTweets(res)
        $("#counter").text("140");
        $("form").trigger("reset");
        $('.container2').replaceWith(renderTweets(res));
      
      })
  }

  //loadTweets();
  //const serialData = $(tweet).serialize();
    // let data = {};
    // $("#tweet").serializeArray().map(d=> data[d.key]=d.value); //and inside ajax obj remove tweet:tweet and place data: data



});