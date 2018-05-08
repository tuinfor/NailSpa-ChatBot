const bodyParser = require('body-parser');
const request = require('request');
const sendResponse = require('./send_respond.js');

function handleMessage(sender_psid, received_message) => {
	console.log('test')
	let key = received_message.text;
	sendResponse.directMessage(sender_psid,key);
}

module.exports = {
  handleMessage,
  handleQuickReply
};