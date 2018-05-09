const bodyParser = require('body-parser');
const request = require('request');
const sendResponse = require('./send_respond.js');
const handleCases = require('./handleCases.js');
const lookUp = require('./informationLookup.js');

let handleChoice = {};
let currentMode = [];

// Handle the basic message from users
function handleMessage(sender_psid, received_message) {
	console.log("Current message: " + received_message.text)
	let response;
	let key = received_message.text;

	// Handle emoji symbol cause of crash
	if (((typeof key) === 'undefined')) {
		handleCases.somethingElse(sender_psid);
	}

	// Handle to begin this bot has to type start
	else if (key.toLowerCase() === 'start') {
		handleCases.getBegin(sender_psid);
		currentMode = [];
	}

	// Handle if it is not in the currentMode
	else if ((currentMode.length == 0) && (key.toLowerCase() != 'start' || key.toLowerCase() != 'exit')) {
		handleCases.somethingElse(sender_psid);
	}

	// Handle to reset this bot if type exit
	else if (key.toLowerCase() === 'exit') {
		currentMode = [];
		handleCases.goBack(sender_psid);
	}

	// Handle the if it is in currentMode
	if (currentMode[0] === 'Q&A') {
		response = {
			"text": `We are currently working on this features. Please come back to visit later. To exit this mode type Exit`
		}
		sendResponse.directMessage(sender_psid, response);
	}
}

// Handle the quick reply message from users
function handleQuickReply(sender_psid, received_message) {
	let response;
    let key = received_message.quick_reply.payload;
    console.log("payload: " + key);
    if (key.includes('Begin')) {

    	// Handle case if in Q&A mode
    	if (key.includes('_Q&A')) {
    		currentMode.push('Q&A');
    		response = {
    			"text": `You are currently on Q&A mode. Please ask anything you want. To exit this mode type Exit`
    		}
    		sendResponse.directMessage(sender_psid, response);
    	}

    	// Handle case if in NailSpa mode
    	else if (key.includes('_NailSpa')) {
    		handleCases.nailSpaOptions(sender_psid);
    	}

    	// Handle case if in Hourly mode
    	else if (key.includes('_Hourly')) {
    		response = {
    			"text" : `MONDAY: Closed\nTUESDAY: 9:30 - 7:30\nWEDNESDAY: 9:30 - 7:30\nTHURSDAY: 9:30 - 7:30\nFRIDAY: 9:30 - 7:30\nSATURDAY: 9:30 - 7:30\nSUNDAY: 12:00 - 5:30\n`
    		}
    		sendResponse.directMessage(sender_psid, response);
    		handleCases.timeOutReset(sender_psid);
    	}

    	// Handle case if in Address mode
    	else if (key.includes('_Address')) {
    		handleCases.addressView(sender_psid);
    		handleCases.timeOutReset(sender_psid);
    	}

    	// Handle case if in Pricelist mode
    	else if (key.includes('_PriceList')) {
    		handleCases.priceList(sender_psid);
    		handleCases.timeOutReset(sender_psid);
    	}

    	// Handle case if in Promotions mode
    	else if (key.includes('_Promotions')) {
    		handleCases.Promotions(sender_psid);
    		handleCases.timeOutReset(sender_psid);
    	}

    	// Handle case if in Weather mode
    	else if (key.includes('_Current Weather')) {
    		lookUp.currentWeather(sender_psid);
    		setTimeout(() => {
		        handleCases.getContinue(sender_psid);
		    }, 10000);
    	}

    	// Handle case if in Call mode
    	else if (key.includes('_Call Now')) {
    		sendResponse.callOption(sender_psid);
    		handleCases.timeOutReset(sender_psid);
    	}
	} else if (key === 'Start_Start') {
		handleCases.getBegin(sender_psid);
		currentMode = [];
	}

	if (key.includes('CONTINUE')) {

		// Handle case if user type yes
		if (key.includes('_Yes')) {
			handleCases.getBegin(sender_psid);
		}

		// Handle case if user type no
		else if (key.includes('_No')) {
			handleCases.quitBot(sender_psid);
		}
	}
}

// Handle the postback message from user
function handlePostback(sender_psid, messagePostback) {
	console.log("Current message: " + messagePostback.payload)
}

module.exports = {
  handleMessage,
  handleQuickReply,
  handlePostback
};