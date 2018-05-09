const request = require('request');
const sendResponse = require('./send_respond.js');
const dataFormat = require('./dataFormat.js');
const handleCases = require('./handleCases.js');
const PythonShell = require('python-shell');
const data = require('../data/get_data.js');
let array = [];

function currentWeather(sender_psid) {
	let status = {
		"text": `Please wait, I am fetching current weather near **Fayetteville**`
	}
	sendResponse.directMessage(sender_psid, status);

	PythonShell.run('./script/get_current_weather.py', (err, data) => {
		if (err) {
			response = {
				"text" : `Can not fetch current weather`
			}
			console.log(err);
			sendResponse.directMessage(sender_psid, response);
		} else {
			array = data;
		}
	});

	setTimeout(() => {
		if (array.length > 0) {
			let weather = '';
			for (var i = 0; i < array.length; i++) {
				weather += array[i] + '\n'
			}
			response = {
				"text": `${weather}`
			}
			console.log(response);
			sendResponse.directMessage(sender_psid, response);
		}
	}, 7000);
}
// currentWeather(112121)

module.exports = {
	currentWeather
}