const mongoose=require('mongoose')
const UpcomingEventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    when:{
        type:Date,
        required:true,
    },
    what:{
        type:String,
        required:true
    },
    contacts:{
        type:Array,
        required:true
    },
    where:{
        type:String,
        required:true
    },
    organizer:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
  
  });

  const UpcomingEvent = mongoose.model('UpcomingEvent', UpcomingEventSchema);
  module.exports=UpcomingEvent;