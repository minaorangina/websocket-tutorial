require('dotenv').config();
const express = require('express');
require('./pusher.js');

const app = express();
const port = process.env.PORT || 8001;
app.use(express.static('public'));

app.listen(port, () => {
  console.info(`Server listening on ${port}`);
});
