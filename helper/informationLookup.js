const request = require('request');
const sendResponse = require('./send_respond.js');
const dataFormat = require('./dataFormat.js');
const handleCases = require('./handleCases.js');
const PythonShell = require('python-shell');
const data = require('../data/get_data.js');
let array = [];
let weather = '';

function currentWeather(sender_psid) {
	let status = {
		"text": `Please wait, I am fetching current weather near **Fayetteville**`
	}
	console.log(status);
	sendResponse.directMessage(sender_psid, status);

	PythonShell.run('../script/get_current_weather.py', (err, data) => {
		if (err) {
			let response = {
				"text" : `Can not fetch current weather`
			}
			console.log(err);
			console.log('Can not fetch current weather')
			sendResponse.directMessage(sender_psid, response);
		} else {
			array = data;
			console.log('In fetching data');
		}
	});
	// setTimeout(() => {
	// 	data.get_current_weather((err, reply) => {
	// 	    if (err) {
	// 	        let response = {
	// 	            "text" : `Can not fetch current weather`
	// 	        }
	// 	        console.log('Can not fetch current weather');
	// 	        sendResponse.directMessage(sender_psid, response);
	// 	    }
	// 	    else {
	// 	        // array = reply;
	// 	        console.log('Fetching data');
	// 	        for (var i = 0; i < reply.length; i++) {
	// 			weather += '**' + reply[i] + '**' + '\n'
	// 			}
	// 			let response = {
	// 				"text": `${weather}`
	// 			}
	// 			sendResponse.directMessage(sender_psid, response);
	// 			console.log(response);
	// 	    }
	// 	})
	// }, 6000);
	setTimeout(() => {
		if (array.length != 0) {
			for (var i = 0; i < array.length; i++) {
				weather += array[i] + '\n'
			}
			let response = {
				"text": `${weather}`
			}
			console.log(response);
			sendResponse.directMessage(sender_psid, response);
		}
	}, 6500);
}
// currentWeather(12121)


module.exports = {
	currentWeather
}