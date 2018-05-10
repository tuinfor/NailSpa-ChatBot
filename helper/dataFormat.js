function quickReplyFormat(payload, value) {
    let finalArr = [];
    for (var i = 0; i < value.length; i++) {
        var map = {};
        map['content_type'] = 'text';
        map['title'] = value[i];
        map['payload'] = payload + '_' + value[i];
        finalArr.push(map);
    }
    return finalArr;
}

function nailSpaOptions(payloadCharacteristic, choices) {
    let finalArr = [];
    for (var i = 0; i < choices.length; i++) {
        var map = {};
        map['type'] = 'postback';
        map['title'] = choices[i];
        map['payload'] = payloadCharacteristic + choices[i];
        finalArr.push(map);
    }
    return finalArr;
}

module.exports = {
	quickReplyFormat,
	nailSpaOptions
}