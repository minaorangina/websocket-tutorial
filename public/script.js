if (document.readyState !== 'loading') {
  ready();
} else {
  document.addEventListener('DOMContentLoaded', ready);
}

function ready () {

  Pusher.logToConsole = true;

  const pusher = new Pusher('pusher-key', {
    cluster: 'eu',
    encrypted: true
  });

  const channel = pusher.subscribe('push-tutorial-channel');
  channel.bind('new-tweet', function (data) {
    console.info(data);
    displayTweet(data.message);
  });
}

function displayTweet (data) {
  const streamContainer = document.querySelector('.stream-container');
  console.log(createTweetDiv(data));
  streamContainer.insertBefore(createTweetDiv(data), streamContainer.firstChild);
}

function createTweetDiv (text) {
  const newTweetContainer = document.createElement('div');
  const tweet = document.createElement('div');
  newTweetContainer.classList.add('tweet-container');
  tweet.classList.add('tweet');
  tweet.appendChild(document.createTextNode(text));
  newTweetContainer.appendChild(tweet);

  return newTweetContainer;
}
