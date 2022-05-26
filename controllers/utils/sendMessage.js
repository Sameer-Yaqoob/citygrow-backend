const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMessage = function (body, to) {
    return client.messages
    .create({
       body,
       from: process.env.TWILIO_PHONE,
       to
     });
}

module.exports = sendMessage;
