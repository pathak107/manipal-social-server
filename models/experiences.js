const mongoose=require('mongoose')
const ExperienceSchema = new mongoose.Schema({
    experience:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    place_id:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'Place'
    },
    likes:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        required:true,
        default: Date.now
    }
  });

  const Experience = mongoose.model('Experience', ExperienceSchema);
  module.exports=Experience;