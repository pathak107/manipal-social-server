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