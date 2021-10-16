const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const chatroomSchema = new Schema({
    name:{
        type:String,
        required:true,

    }
})

module.exports = mongoose.model("ChatRoom", chatroomSchema);