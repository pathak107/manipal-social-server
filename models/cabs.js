const mongoose=require('mongoose')
const CabSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    dateTime:{
        type:Date,
        required:true,
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        required:true,
    }
  });

  const Cab = mongoose.model('Cab', CabSchema);
  module.exports=Cab;