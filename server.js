require('dotenv').config();
const express = require('express');
const formidable = require('express-formidable');
const pusher = require('./pusher.js');

const app = express();
const port = process.env.PORT || 8001;
app.use(express.static('public'));
app.use(formidable());

app.post('/tweet', (req, res) => {
  console.log(req.fields);
  pusher.trigger('push-tutorial-channel', 'new-tweet', {
    "message": req.fields.tweetbox
  });
  res.end();
});

app.listen(port, () => {
  console.info(`Server listening on ${port}`);
});
