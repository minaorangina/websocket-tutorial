if (document.readyState !== 'loading') {
  ready();
} else {
  document.addEventListener('DOMContentLoaded', ready);
}

function ready () {

  const form = document.querySelector('form');
  form.addEventListener('submit', function (event) {

    event.preventDefault();
    const formActionUrl = form.action;
    const formData = new FormData(form);

    postTweet(formActionUrl, formData);
  });

  Pusher.logToConsole = true;

  const pusher = new Pusher('pusher-key', {
    cluster: 'eu',
    encrypted: true
  });

  const channel = pusher.subscribe('push-tutorial-channel');
  channel.bind('new-tweet', function (data) {
    console.info('INCOMING!', data);
    displayTweet(data.message);
  });
}

function postTweet (url, data) {
  fetch(url, {
    method: 'POST',
    body: data
  })
  .then(function (res) {
    if (res.status === 200) {
      document.querySelector('form').reset();
    }
  })
  .catch(function (err) {
      console.error(err)
  });
}

function displayTweet (data) {
  const streamContainer = document.querySelector('.stream-container');
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
