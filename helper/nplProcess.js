const request = require('request');
const sendResponse = require('./send_respond.js');
const API_AI_TOKEN = '312be21971c84661aa8a2269e785b8bf';
const apiAiClient = require('apiai')(API_AI_TOKEN);

function nplanguageMessage(sender_psid, message) {
	const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'nailsalon-bot'});
		apiaiSession.on('response', (response) => {
			const result = response.result.fulfillment.speech;
			console.log("result:", result);
			let output = {
				"text": `${result}`
			}
			sendResponse.directMessage(sender_psid, output);
		});
		apiaiSession.on('error', error => console.log(error));
		apiaiSession.end();
}

module.exports = {
	nplanguageMessage
}