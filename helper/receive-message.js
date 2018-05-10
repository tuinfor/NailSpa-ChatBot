const bodyParser = require('body-parser');
const request = require('request');
const sendResponse = require('./send_respond.js');
const handleCases = require('./handleCases.js');
const lookUp = require('./informationLookup.js');
const NPL = require('./nplProcess.js');

let handleChoice = {};
let currentMode = [];

// Handle the basic message from users
function handleMessage(sender_psid, received_message) {
	let response;
	let key = received_message.text;
	console.log("Current message: " + received_message.text)

	// Handle the emoji message
	if (((typeof key) === 'undefined') && (currentMode.length == 0)) {
		handleCases.somethingElse(sender_psid);
	}

	// Handle to begin this bot has to type start
	else if ((key.toLowerCase() === 'start') && (currentMode.length == 0)) {
		handleCases.getBegin(sender_psid);
	}

	// Handle if it is not in the currentMode, if the message is not start, exit
	else if ((currentMode.length == 0) && (key.toLowerCase() != 'start' || key.toLowerCase() != 'exit')) {
		handleCases.somethingElse(sender_psid);
	}

	// Handle to reset this bot if type exit
	else if (key.toLowerCase() === 'exit') {
		currentMode = [];
		handleCases.goBack(sender_psid, 'exit');
	}

	// Handle the if it is in currentMode
	if (currentMode[0] === 'Q&A') {

		// Call asyns to get the message respone in apiai
		NPL.nplanguageMessage(sender_psid, key);
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
    		handleCases.QAmode(sender_psid);
    	}

    	// Handle case if in NailSpa mode
    	else if (key.includes('_NailSpa')) {
    		handleCases.nailSpaOptions(sender_psid);
    	}

    	// Handle case if in Hourly mode
    	else if (key.includes('_Hourly')) {
    		handleCases.getHourly(sender_psid);
    	}

    	// Handle case if in Address mode
    	else if (key.includes('_Address')) {
    		handleCases.addressView(sender_psid);
    	}

    	// Handle case if in Pricelist mode
    	else if (key.includes('_PriceList')) {
    		handleCases.priceList(sender_psid);
    	}

    	// Handle case if in Promotions mode
    	else if (key.includes('_Promotions')) {
    		handleCases.Promotions(sender_psid);
    	}

    	// Handle case if in Weather mode
    	else if (key.includes('_Current Weather')) {
    		lookUp.currentWeather(sender_psid);
    		setTimeout(() => {
		        handleCases.getContinue(sender_psid);
		    }, 10000);
    	}

    	// Handle case if in call mode
    	else if (key.includes('_Call Now')) {
    		sendResponse.callOption(sender_psid);
    		handleCases.timeOutReset(sender_psid);
    	}

    	// Handle case if user no long want to use our bot
    	else if (key.includes('_Exit')) {
    		handleCases.quitBot(sender_psid);
    	}
	} else if (key === 'Start_Start') {
		handleCases.getBegin(sender_psid);
		currentMode = [];
	}

	// Handle case if user decice to continue our bot or not
	if (key.includes('CONTINUE')) {

		// Handle case if user type yes then go back to quick option
		if (key.includes('_Yes')) {
			handleCases.goBack(sender_psid, 'yes');
		}

		// Handle case if user type no then prompt to exit
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