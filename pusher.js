const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'eu',
  encrypted: true
});

pusher.trigger('push-tutorial-channel', 'new-tweet', {
  "message": "hello world"
});

module.exports = pusher;
