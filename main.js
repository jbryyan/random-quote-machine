$(document).ready(function() {

  var author; //Used to store API response for author of quote
  var quote;  //Used to store API response for quote
  //Color list for background page
  var colors = ["#6D7696",
  "#59484F", "#455C4F", "#CC5543", "#EDB579",
  "#DBE6AF", "#E6E2DF", "#B2E3E8", "#CCB8D1",
  "#966C5D", "#452B29", "#8F8172"],
  color;

  //Using API to get new quote
  function getNewQuote(){
    //API Request
    $.ajax({
      url: 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en',
      jsonp:  'jsonp',
      dataType: 'jsonp',
      data: {
        method: 'getQuote',
        lang: 'en',
        format: 'jsonp'
      },
      success:  function(response){
        author = response.quoteAuthor;
        quote = response.quoteText;
        if(author){
          $("#quote").html(response.quoteText);
          $("#author").html("- " + response.quoteAuthor);
        }
        else{
          $("#quote").html(response.quoteText);
          $("#author").html("- Unkown");
        }

      }
    })
  }

  //Function to change the backgrund, and text color to the colors specified at the top
  function randBackColor(){
    var randColor;
    do {
      randColor = colors[Math.floor(Math.random() * colors.length)];
    } while (color == randColor);
    $("body").css("background", randColor);
    $(".card-text").css("color", randColor);
    $("button").css("background", randColor);
    color = randColor;
  }

  //On click, get new quote and change the background color
  $("#getQuote").on("click", function(){
    randBackColor();
    getNewQuote();
  });

  //On clicking the twitter button, post quote to twitter
  $("#sendTweet").on("click", function(){
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(quote + " -" + author));
  });

  //Blur on mouse up for all buttons
  $(".btn").mouseup(function(){
    $(this).blur();
  });

  //By Default load a quote from API, load random background color
  getNewQuote();
  randBackColor();

});
