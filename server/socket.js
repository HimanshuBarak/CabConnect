// server/socket.js
const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("./models/Message");

function initializeSocket(server) {
  const io = socketIO(server, {
    allowEIO3: true,
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.query.token;
      if (!token) {
        console.log("didn't match");
        return next(new Error("Unauthorized"));
      }
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = verified.email;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('message', 'Welcome to Chat App!');
    socket.broadcast.emit('message', 'A new user has joined a chat');

    socket.on("joinRoom", ({chatroom}) => {
      socket.join(chatroom);
      console.log("A new user just joined!");
    });

    socket.on('message', ({chatroom, username, text, email}) => {
      try {
        const new_msg = new Message({ chatroom, username, text, email });
        new_msg.save();
        io.to(chatroom).emit("newMessage", { text, username, chatroom, email });
      } catch (err) {
        console.error(err);
      }
    });

    socket.on("leaveRoom", ({ chatroomId }) => {
      socket.leave(chatroomId);
      console.log("A user left chatroom: " + chatroomId);
    });
  });
}

module.exports = initializeSocket;
