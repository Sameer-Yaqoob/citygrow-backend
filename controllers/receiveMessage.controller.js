const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { db } = require("../firebase");

module.exports = async function (req, res) {
    const twiml = new MessagingResponse();
    const doc = await db.collection("messages").doc(req.body.From).get();
    if(doc.exists){
      const messages = doc.data().messages;
      messages.push({message: req.body.Body, senderId: req.body.From});
      await db.collection("messages").doc(req.body.From).update({messages});
    }
    else{
      await db.collection("messages").doc(req.body.From).create({messages: [{message: req.body.Body, senderId: req.body.From}]});
    }
    twiml.message('Thanks for contacting, you can chat here!');
  
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }