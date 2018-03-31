const
  bodyParser = require('body-parser'),
  request = require('request')

const handleMessage = (sender_psid, received_message) => {
	console.log('test')
}

const handleQuickReply = (sender_psid, received_message) => {

}

module.exports = {
  handleMessage,
  handleQuickReply
};