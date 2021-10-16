const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const msgSchema = new Schema({
  text: { type: String, required: true },
  username: {
    type: String,
    required: "user is required!",
   
  },
  email: {
    type: String,
    required: true
 },
  chatroom:{ type: String, required: true}
}, {
  timestamps: true,
});

const Message = mongoose.model('Messages', msgSchema);

module.exports = Message;