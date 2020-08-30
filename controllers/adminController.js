const Place = require("../models/places")

exports.create_place=(req,res)=>{
    const place=new Place({
        name:req.body.name,
        type:req.body.type,
        what:req.body.what,
        where:req.body.where,
        specialInfo:req.body.specialInfo,
        imageUrl:req.body.imageUrl,
        coordinates:[req.body.latitude,req.body.longitude]
    })
    place.save((err,newPlace)=>{
        if(err){}
        console.log(newPlace);
        return res.send(newPlace);
    })
}