const request = require('request');
const sendResponse = require('./send_respond.js');

function getBegin(sender_psid) {
    let choices = ['Q&A', 'NailSpa', 'Hours', 'Address', 'PriceList', 'Promotions', 'Current Weather', 'Call Now'];
    request({
        "uri": "https://graph.facebook.com/v2.6/" + sender_psid,
        "qs" : {"access_token": process.env.PAGE_ACCESS_TOKEN, fields: "first_name"},
        "method": "GET",
        "json": true,
    }, (err, res, body) => {
        if (err) {
            console.error("Unable to send message:" + err);
            } else {
            let userName = body.first_name;

            // Create the payload for a basic text message
            let response = {
                "text": `Hi ${userName}, Welcome to our Nail Salon bot. What are you looking for today?`
            }
            sendResponse.quickReplies(sender_psid, response, 'Begin', choices);
        }
    })
}

function goBack(sender_psid) {
    let choices = ['Q&A', 'NailSpa', 'Hours', 'Address', 'Call Now'];
    let response = {
        "text": `Quitting Q&A mode`
    }
    sendResponse.quickReplies(sender_psid, response, 'Begin', choices);
}

function somethingElse(sender_psid) {
    let choice = ['Start']
    response = {
        "text": `Please hit Start to start our bot!!!`
    }
    sendResponse.quickReplies(sender_psid, response, 'Start', choice);
}

function nailSpaOptions(sender_psid) {
    let choices = ['Employee', 'Gift Certificate', 'Book Appointment'];
    let imageURL = 'http://fayettenailspa.com/salon/wp-content/themes/spatreats/images/logoNS.png'
    sendResponse.genericTemplate(sender_psid, 'OPTION', choices, imageURL);
}

function employee(sender_psid) {
    let choices = ['Kevin', 'Trina', 'Tina', 'Vee', 'Lin', 'Amy', 'Ryan'];
}

// Repeats the main bot function.
function getContinue(sender_psid) {
    let key = ['Yes', 'No'];
    let response = {
        'text': 'Do you want to get back to the START?'
    }
    sendResponse.quickReplies(sender_psid, response, 'CONTINUE', key);
}

// Quit the main bot.
function quitBot(sender_psid) {
    let response = {
        'text': 'Thank you so much for your time. Please come back to visit whenever you have any concern questions'
    }
    sendResponse.directMessage(sender_psid, response);
}

function timeOutReset(sender_psid) {
    setTimeout(() => {
        getContinue(sender_psid);
    }, 3500);
}

module.exports = {
    getBegin,
    somethingElse,
    goBack,
    nailSpaOptions,
    employee,
    getContinue,
    quitBot,
    timeOutReset
}