const { sendMessageController, receiveMessageController } = require("./controllers");

module.exports = function (app) {
    app.post('/send_message', sendMessageController);
    app.post('/receive_message', receiveMessageController);
}

