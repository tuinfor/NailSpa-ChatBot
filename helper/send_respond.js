const request = require('request');

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
        "qs": { "access_token": EAADSxzqieyEBANwTrRZAx7NSEA8oEgavb2ESSuAFHEetXlAPP1so62RZCcyB16mkmOOuIJvJXSSZBW47qMZAnvOXZBlXjwafFZCWXg4JK3fNUx3XxKJNyeSIgFffAGEsknhYyU9dw1rPSvAL9d6nXZB5ruwSMcenYGH4TE52OQINTBAjtPYZCDcp},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (err) {
            console.error("Unable to send message:" + err);
        }
    });
}

module.exports = {
    directMessage
};