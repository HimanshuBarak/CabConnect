const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  roomName: { type: String, required: true },
  destination: { type: String, required: true },
  time: { type: String, required: true },
  date:{type:Date,required:true},
  people:{type:Number ,required:true},
  contact:{type:String,required:true},
  email:{type:String,required:true}
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;