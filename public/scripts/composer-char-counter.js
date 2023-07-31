$(document).ready(function() {
  $('.new-tweet textarea').on('keyup', function(event) {
    event.preventDefault();

    const maxLength = 140; // Maximum character limit for the tweet
    const inputValue = $(this).val(); // Gets textarea value
    const inputLength = inputValue.length; // Gets the length of the input value

    // Update the character counter
    const remainingChars = maxLength - inputLength;
    const counterElement = $(this).closest('.new-tweet').find('.counter');
    counterElement.text(remainingChars);

    /// Add red color to the counter when input is invalid
    if (inputLength > maxLength) {
      counterElement.addClass('invalid');
    } else {
      counterElement.removeClass('invalid');
    }

  });
});
