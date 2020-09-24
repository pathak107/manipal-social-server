const mongoose=require('mongoose')
const ChatSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
  });

  const Chat = mongoose.model('Chat', ChatSchema);
  module.exports=Chat;