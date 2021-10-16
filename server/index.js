const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Message = require("./models/Message")
const cookieParser = require("cookie-parser")
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
dotenv.config();

// set up server
const server = require('http').createServer(app);


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:["http://localhost:3000","http://localhost:3001"],
  credentials:true,
}));





// connect to mongoDB

mongoose.connect(
  process.env.MDB_connect,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

//set up routes



app.use("/auth",require("./routers/auth"));
app.use("/post",require("./routers/post"));
app.use("/chat",require("./routers/chat"));



const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
  }
});
/*
io.use( (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    if (!token)
    {
       console.log("didnt match")
       return res.status(401).json({ errorMessage: "Unauthorized" });
    }
     
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = verified.email;
    next();
  } catch (err) {}
});
*/
// the conncection is set up 
io.on('connection', (socket) => {
  // io.emit() -> for all clients when a connection happens
  // socket.emit() -> for that particular socket connection
  // socket.broadcast.emit() -> all other clients apart from that socket connection
  console.log('a user connected');

  // emits a message to the client who has newly joined a chat (only to that client)
  socket.emit('message', 'Welcome to Chat App!');

  // broadcast.emits a message to all other clients when a client joins a chat (apart from the joining client)
  socket.broadcast.emit('message', 'A new user has joined a chat');


  //join chatroom
  socket.on("joinRoom",({chatroom})=>{
     socket.join(chatroom);
     console.log("A new user just joined!")
  })


  //a new message is recieved
  socket.on('message', ({chatroom,username,text,email}) => {
    try{
      const new_msg = new Message({
        chatroom,
        username,
        text,email
      })
      new_msg.save();
      //emitting the new message to the room
      io.to(chatroom).emit("newMessage",{
        text,
        username,
        chatroom,
        email
      })
      
    } catch(err){
      console.error(err)
    }  
    
  });
  
  // leave room
  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });
});
