const bodyParser = require('body-parser');
const request = require('request');
const sendResponse = require('./send_respond.js');
const handleCases = require('./handleCases.js');
const lookUp = require('./informationLookup.js');

let handleChoice = {};
let currentMode = [];

// Handle the basic message from users
function handleMessage(sender_psid, received_message) {
	console.log("Curremt message: " + received_message.text)
	let response;
	let key = received_message.text;
	if (key.toLowerCase() === 'start') {
		handleCases.getBegin(sender_psid);
		currentMode = [];
	} else if (currentMode.length == 0 && (key.toLowerCase() != 'start' || key.toLowerCase() != 'exit')) {
		handleCases.somethingElse(sender_psid);
	}

	if (currentMode[0] === 'Q&A') {
		response = {
			"text": `We are currently working on this features. Please come back to visit later`
		}
		sendResponse.directMessage(sender_psid, response);
		if (key.toLowerCase() === 'exit') {
			currentMode = [];
			handleCases.goBack(sender_psid);
		}
	}
}

// Handle the quick reply message from users
function handleQuickReply(sender_psid, received_message) {
	let response;
    let key = received_message.quick_reply.payload;
    console.log("payload: " + key);
    if (key.includes('Begin')) {
    	if (key.includes('_Q&A')) {
    		currentMode.push('Q&A');
    		response = {
    			"text": `You are currently on Q&A mode. Please ask anything you want. To exit this mode type Exit`
    		}
    		sendResponse.directMessage(sender_psid, response);
    	}

    	else if (key.includes('_NailSpa')) {
    		handleCases.nailSpaOptions(sender_psid);
    	}

    	else if (key.includes('_Hours')) {
    		response = {
    			"text" : `MONDAY: Closed\nTUESDAY: 9:30 - 7:30\nWEDNESDAY: 9:30 - 7:30\nTHURSDAY: 9:30 - 7:30\nFRIDAY: 9:30 - 7:30\nSATURDAY: 9:30 - 7:30\nSUNDAY: 12:00 - 5:30\n`
    		}
    		sendResponse.directMessage(sender_psid, response);
    		handleCases.timeOutReset(sender_psid);
    	}

    	else if (key.includes('_Address')) {
    		sendResponse.addressWebView(sender_psid);
    		handleCases.timeOutReset(sender_psid);
    	}

    	else if (key.includes('_PriceList')) {

    	}

    	else if (key.includes('_Promotions')) {

    	}

    	else if (key.includes('_Current Weather')) {
    		lookUp.currentWeather(sender_psid);
    		handleCases.timeOutReset(sender_psid);
    	}

    	else if (key.includes('_Call Now')) {
    		sendResponse.callOption(sender_psid);
    		handleCases.timeOutReset(sender_psid);
    	}

	} else if (key === 'Start_Start') {
		handleCases.getBegin(sender_psid);
		currentMode = [];
	}

	if (key.includes('CONTINUE')) {
		if (key.includes('_Yes')) {
			handleCases.getBegin(sender_psid);
		} else if (key.includes('_No')) {
			handleCases.quitBot(sender_psid);
		}
	}
}

// Handle the postback message from user
function handlePostback(sender_psid, messagePostback) {
	console.log("Curremt message: " + messagePostback.payload)
}

module.exports = {
  handleMessage,
  handleQuickReply,
  handlePostback
};