const Cab=require('../models/cabs');

exports.cab_shares_find=(req,res)=>{
    console.log(req.body.to);
    console.log(req.body.from);
    console.log(req.body.dateTime)
    //find the cab info related to this user and update
    Cab.findOne({user_id:req.userData.user_id},(err,cab)=>{
        if(err){
            return res.json({
                status: "failure",
                message: "Some error occurred in creating cabs shares",
                error: err,
            })
        };

        let dateTime=Date.parse(req.body.dateTime);
        if(cab==undefined||cab==null){
            // user has never searched for a cab
            const newCab=new Cab({
                to:req.body.to,
                from:req.body.from,
                dateTime:dateTime,
                user_id:req.userData.user_id
            })
            newCab.save();
        }else{
            //user has searched for cabs in past
            //update the to, from and dateTime
            cab.to=req.body.to;
            cab.from=req.body.from;
            cab.dateTime=dateTime;
            cab.save();
        }
    })

    //Find other cabs matching the requirents of user
    let dateTime=new Date(req.body.dateTime);
    //all the cabs within the time range of + and - 10 hrs
    let minDateTime=new Date(dateTime.getTime()-10*60*60*1000) 
    let maxDateTime=new Date(dateTime.getTime()+10*60*60*1000)

    Cab.find({dateTime:{$lt:maxDateTime,$gt:minDateTime},to:req.body.to,from:req.body.from},(err,cabs)=>{
        if(err){
            return res.json({
                status: "failure",
                message: "Some error occurred in finding cabs shares",
                error: err,
            })
        }
        cabs.sort((a,b)=>{
            console.log(Math.abs(a.dateTime-dateTime))
            console.log(Math.abs(b.dateTime-dateTime))
            return Math.abs(a.dateTime-dateTime) - Math.abs(b.dateTime-dateTime);
        })
        res.status(200).json({
            status: "success",
            message: "Retrived all the cab shares",
            data: {
                cabShareList:cabs,
            }
        });
    }).populate('user_id')
}