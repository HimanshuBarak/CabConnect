const router = require("express").Router();
const Post = require("../models/postModel");
const auth = require("../middleware/auth")
const ChatRoom = require("../models/ChatRoom.js")

 const mobile =/^[6-9]\d{9}$/;
 const time_reg =/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
//for creating a post 
router.post("/create",auth, (req, res) => {
    try {
      const { roomName ,destination,time,people,date,contact } = req.body;
      const email =req.email;
      if (!roomName) 
        return res.status(400).json({errorMessage:"Name is required"});
        
      if (!destination) 
        return res.status(400).json({errorMessage:"Destination is required"});
      
     
      if (!time_reg.test(time)) 
        return res.status(400).json({errorMessage:"Enter valid time in 24 hr format"});
       
      if (!date) 
        return res.status(400).json({errorMessage:"Date is required"});
       
      if (!people) 
        return res.status(400).json({errorMessage:"No. of people is required"});
       

      if (!mobile.test(contact)) 
        return res.status(400).json({errorMessage:"Please enter a valid number"});
      
       
      ChatRoom.findOne({name:roomName})
      .then(croom =>{
          if(croom){
              return res.status(422).json({errorMessage:"The email you entered already exists"});
          }
          else{
              const chatroom = new ChatRoom({
                name:roomName,
              });
            
              chatroom.save()
              .then(response=>{
                res.status(200).json({result:response})
              })
            }
        })
      const new_post = new Post({
        roomName,destination,people,time,people,date,contact,email
      });
      
      //create the room 
     

       new_post.save()
       .then(response => {
            res.status(200).json({success: true, result: response})
                    })
      
    } catch (err){
      console.error(err);
      res.status(500).send();
    }
  
  });

 //get all the posts 
  router.get("/", auth, async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });

 //get all the posts of a particular user 
 router.get("/user", auth, async (req, res) => {
  try {
    const email=req.email;
    const posts = await Post.find({email:email});
    
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//delete the given post
router.delete("/del/:id",auth,(req,res)=>{
  Post.findByIdAndDelete(req.params.id)
  .then(() => res.json('Post deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
})


  module.exports = router;