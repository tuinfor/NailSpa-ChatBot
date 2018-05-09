const request = require('request');
const sendResponse = require('./send_respond.js');

// Function that help to appear the UI Quick replies
function getBegin(sender_psid) {
    let choices = ['Q&A', 'NailSpa', 'Hourly', 'Address', 'PriceList', 'Promotions', 'Current Weather', 'Call Now'];
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

// Function that help to reappear the UI Quick replies after quitting mode
function goBack(sender_psid) {
    let choices = ['Q&A', 'NailSpa', 'Hourly', 'Address', 'PriceList', 'Promotions', 'Current Weather', 'Call Now'];
    let response = {
        "text": `Quitting Q&A mode`
    }
    sendResponse.quickReplies(sender_psid, response, 'Begin', choices);
}

// Function that help user to get back to the starting point if they are not in the start mode
function somethingElse(sender_psid) {
    let choice = ['Start']
    response = {
        "text": `Please hit Start to start our bot!!!`
    }
    sendResponse.quickReplies(sender_psid, response, 'Start', choice);
}

// Function that help to appear the generic template for Nail Spa
function nailSpaOptions(sender_psid) {
    let choices = ['Employee', 'Gift Certificate', 'Book Appointment'];
    let imageURL = 'http://fayettenailspa.com/salon/wp-content/themes/spatreats/images/logoNS.png'
    sendResponse.genericTemplate(sender_psid, 'OPTION', choices, imageURL);
}

// Function that will generate to the employee
function employee(sender_psid) {
    let choices = ['Kevin', 'Trina', 'Tina', 'Vee', 'Lin', 'Amy', 'Ryan'];
}

// Function that help user to get repeats the main bot function.
function getContinue(sender_psid) {
    let key = ['Yes', 'No'];
    let response = {
        'text': 'Do you want to get back to the START?'
    }
    sendResponse.quickReplies(sender_psid, response, 'CONTINUE', key);
}

// Function that help user to quit the main bot.
function quitBot(sender_psid) {
    let response = {
        'text': 'Thank you so much for your time. Please come back to visit whenever you have any concern questions'
    }
    sendResponse.directMessage(sender_psid, response);
}

// Function that help to let it sleep in few sec before it execute
function timeOutReset(sender_psid) {
    setTimeout(() => {
        getContinue(sender_psid);
    }, 3500);
}

// Function that generate function for promotion
function Promotions(sender_psid) {
    response = {
        "text" : `Our Nail Salon currently has no promotion going on. Please check back for more detail`
    }
    sendResponse.directMessage(sender_psid, response);
}

// Function that generate function for pricelist
function priceList(sender_psid) {
    response = {
        "text" : `Our Nail Salon currently accepted debit and credit cards of types Visa and Mastercard`
    }
    sendResponse.directMessage(sender_psid, response);

    let titleTemp = "Nail Spa - Fayetteville (Price List)";
    let title = "View on Web";
    let imgUrl = "https://lh5.googleusercontent.com/p/AF1QipM8pVE2qmPNnHx012FNc1esjWWBP-uv5rYVsGDu=w392-h303-k-no";
    let webUrl = "http://fayettenailspa.com/salon/services/price-list/";
    sendResponse.webView(sender_psid, titleTemp, title, imgUrl, webUrl);
}

// Function that generate generic template for webview
function addressView(sender_psid) {
    let titleTemp = "1240 Hwy 54 West #302, Fayetteville GA 30214";
    let title = "View on Google Map";
    let imgUrl = "https://lh5.googleusercontent.com/p/AF1QipM8pVE2qmPNnHx012FNc1esjWWBP-uv5rYVsGDu=w392-h303-k-no";
    let webUrl = "https://goo.gl/maps/mVSj22Cyenx";
    sendResponse.webView(sender_psid, titleTemp, title, imgUrl, webUrl);
}

module.exports = {
    getBegin,
    somethingElse,
    goBack,
    nailSpaOptions,
    employee,
    getContinue,
    quitBot,
    timeOutReset,
    Promotions,
    priceList,
    addressView
}