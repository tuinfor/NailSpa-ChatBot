// Imports dependencies and set up http server
const
  request = require('request'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  webhooks = require('./routes/webhooks');
  
// Sets server port and logs message on success
// process.env.PORT || 
app.listen(process.env.PORT || 1337, () => {
// app.listen(1337, () => {

  console.log('webhook is listening');

});

app.use(bodyParser.json());

app.use('/webhook', webhooks);

module.exports = app;