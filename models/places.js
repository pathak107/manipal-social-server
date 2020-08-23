const mongoose=require('mongoose')
const PlaceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
    },
    what:{
        type:String,
        required:true
    },
    where:{
        type:String,
        required:true
    },
    specialInfo:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    coordinates:{
        type:Array, //for logitude and latitude
        required:true
    },
    
  });

  const Place = mongoose.model('Place', PlaceSchema);
  module.exports=Place;