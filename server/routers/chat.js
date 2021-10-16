const router = require("express").Router();
const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message")
const auth = require("../middleware/auth")



 
//for getting the specific chatroom 
  router.get("/", auth, async (req, res) => {
    try {
      const {name } = req.body
      const chatroom = await ChatRoom.findOne(name)
      res.json(chatroom);
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });


//for getting all the messages of the given chatroom
router.get("/chatroom",auth,async(req,res)=>{
  try{
     
    let chatroom = req.query.chatroom
      const messages = await Message.find({chatroom})
     
      res.json(messages)

  }catch(err){
    console.error(err)
  }
})

  module.exports = router;
  