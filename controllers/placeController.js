//importing models
const Place=require('../models/places')
exports.place_get_all=(req,res)=>{
    //send list of all the places
    console.log("fetching all places");
    Place.find((err,places)=>{
        console.log(places);
        if(err){
            return res.json({
                status: "failure",
                message: "Some error occurred in retrieving places from database",
                error: err,
            })
        }
        //segregate depending upon types
        var beaches=[];
        var clubs=[];
        var resturants=[];
        places.filter((value)=>{
            if(value.type=='beach')
            {
                beaches.push(value);
            }
            else if(value.type=='club'){
                clubs.push(value);
            }
            else if(value.type=='resturant'){
                resturants.push(value);
            }
        })
        return res.status(200).json({
            status: "success",
            message: "Retrived all the places",
            data: {
                clubs:clubs,
                resturants:resturants,
                beaches:beaches
            }
        })
    }) 
}

exports.place_create=(req,res)=>{
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
        if(err){
            return res.json({
                status: "failure",
                message: "Some error occurred in creating the place",
                error: err,
            })
        }
        console.log(newPlace);
        return res.status(200).json({
            status: "success",
            message: "place created",
            newPlace: newPlace,
        })
    })
}

exports.place_delete=(req,res)=>{
    const placeID=req.params.placeID;
    Place.findByIdAndDelete(placeID,(err,place)=>{
        if(err){
            return res.json({
                status: "failure",
                message: "Some error occurred in deleting the place",
                error: err,
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Succesfully deleted place",
            deletedPlace: place,
        })
    })
}

exports.place_update=(req,res)=>{
    const placeID=req.params.placeID;
    Place.findById(placeID,(err,place)=>{
        if(err){
            return res.json({
                status: "failure",
                message: "Some error occurred in updating the place",
                error: err,
            })
        }

        //updating all the values sent
        place.name=req.body.name,
        place.type=req.body.type,
        place.what=req.body.what,
        place.where=req.body.where,
        place.specialInfo=req.body.specialInfo,
        place.imageUrl=req.body.imageUrl,
        place.coordinates=[req.body.latitude,req.body.longitude]

        place.save((err,updatedPlace)=>{
            if(err){
                return res.json({
                    status: "failure",
                    message: "Some error occurred in creating the place",
                    error: err,
                })
            }
            console.log(updatedPlace);
            return res.status(200).json({
                status: "success",
                message: "place updated",
                updatedPlace: updatedPlace,
            })
        })
    })
}