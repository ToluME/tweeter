/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const $tweet = $(`
    <article class="tweet">
      <header class="header">
        <img src="${escape(tweet.user.avatars)}" alt="Profile Image">
        <div class="user-info">
        <h3 class="user-name">${escape(tweet.user.name)}</h3>
        <span class="handle">${escape(tweet.user.handle)}</span>
        </div>
      </header>
      <div class="tweet-content">
      <p class="content">${escape(tweet.content.text)}</p>
      </div>
      <footer>
        <div class="timestamp">${escape(timeago.format(tweet.created_at))}</div>
        <div class="actions">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
      </footer>
    </article>
  `);
  return $tweet;
};

$(document).ready(function() {
  const renderTweets = function(tweets) {
    const $tweetContainer = $('.tweet-container');
    $tweetContainer.empty(); // Clear the container before appending new tweets
    // loops through tweets
    tweets.forEach(function(tweet) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);

      // takes return value and adds it to the tweets container
      $tweetContainer.prepend($tweet);
    });
  };

  const loadTweets = function() {
    // get the form data from the server
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/tweets',
      dataType: 'JSON',
      success: function(response) {
        console.log('Tweets loaded successfully:', response);
        renderTweets(response);
      },
      error: function(error) {
        console.log('Something went wrong:', error);
      }
    });
  };
  
  const $errorElement = $('.error-message'); // Targets error message element

  $('#tweet-form').on('submit', function (event) {
    event.preventDefault();
    //Hide the error message element
    $('.error-message').slideUp();


    const $tweetText = $('#tweet-text');
    const tweetContent = $tweetText.val();

    // Trim tweet content to remove leading/ trailing spaces
    const trimmedContent = tweetContent.trim();

    //Validate tweet content
    if (trimmedContent === '') {
      $errorElement.text('Please enter a tweet.'); //Set error message text
      $errorElement.slideDown(); //errror message with slide down animation
      return;
    }
    if (trimmedContent.length > 140) {
      $errorElement.text('Maximum character limit exceeded');
      $errorElement.slideDown();
      return;
    }

    let formData = $(this).serialize(); //Serialize the form data

    // send the form data to the server
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData,
      success: function (response) {
        console.log('Tweet submitted successfully:', response);
        $tweetText.val(''); //clear the tweet text area
        loadTweets(); // renders updated tweets
      },
      error: function (error) {
        console.error('Something went wrong:', error);
      }
    });
  });
  //Call loadtweets initially to fetch and render the existing tweets
  loadTweets();
});
    
