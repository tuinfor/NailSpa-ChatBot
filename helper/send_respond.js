const request = require('request');
const dataFormat = require('./dataFormat.js');

// Post a form of direct message to the server
function directMessage(sender_psid, response) {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (err) {
            console.error("Unable to send message:" + err);
        }
    });
}

function genericTemplate(sender_psid, payload, array, imageURL) {
    let button = dataFormat.nailSpaOptions(payload, array);
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": 'generic',
                    "image_aspect_ratio": 'square',
                    "elements":
                    [
                        {
                            "title": 'NAIL SPA',
                            "image_url": imageURL,
                            "buttons": button
                        }
                    ]
                }
            }
        }
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (err) {
            console.error("Unable to send message:" + err);
        }
    });
}

function quickReplies(sender_psid, response, payloadCharacteristic, array) {
    let jsonFile = dataFormat.quickReplyFormat(payloadCharacteristic, array);
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": {
            "text": response["text"],
            "quick_replies": jsonFile
        }
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (err) {
            console.error("Unable to send message:" + err);
        }
    });
}

function callOption(sender_psid) {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message":{
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"Hit call to talk to our Salon manager",
            "buttons":[
              {
                "type":"phone_number",
                "title":"Call NailSpa",
                "payload":"+17707191989"
              }
            ]
          }
        }
      }
    }
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (err) {
            console.error("Unable to send message:" + err);
        }
    });
}

function addressWebView(sender_psid) {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message":{
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"generic",
                "image_aspect_ratio": 'square',
                "elements":
                [
                    {
                        "title": '1240 Hwy 54 West #302, Fayetteville GA 30214',
                        "image_url": "https://lh5.googleusercontent.com/p/AF1QipM8pVE2qmPNnHx012FNc1esjWWBP-uv5rYVsGDu=w392-h303-k-no",
                        "buttons":[
                        {
                            "type":"web_url",
                            "url":"https://goo.gl/maps/mVSj22Cyenx",
                            "title":"View on Google Map",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": "false",
                        }
                        ]
                    }
                ]
            }
        }
        }
    }
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (err) {
            console.error("Unable to send message:" + err);
        }
    });
}

module.exports = {
    directMessage,
    genericTemplate,
    quickReplies,
    callOption,
    addressWebView
};