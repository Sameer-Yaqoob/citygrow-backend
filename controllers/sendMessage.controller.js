const sendMessage = require('./utils/sendMessage');
const { db } = require("../firebase");

module.exports = async function (req, res){
    try{
      const message = req.body.message;
      const to = req.body.to;
      await sendMessage(message, to);
      const doc = await db.collection("messages").doc(to).get();
      if(doc.exists){
        const messages = doc.data().messages;
        messages.push({message, senderId: process.env.TWILIO_PHONE});
        await db.collection("messages").doc(to).update({messages});
      }
      else{
        await db.collection("messages").doc(to).create({messages: [{message, senderId: process.env.TWILIO_PHONE}]});
      }
      res.status(200).json({message: "The message was successfully delivered!"});
    }
    catch(err){
      console.log(err);
      res.status(500).json({message: "Something went wrong, try again!"});
    }
  }