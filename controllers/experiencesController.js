//importing models
const Exp = require('../models/experiences');
const User=require('../models/users')
exports.exp_get_all = (req, res) => {
    //send list of all the experiences of a place
    console.log("fetching all experiences");
    Exp.find({place_id:req.params.placeID},(err, exps) => {
        if (err) {
            return res.json({
                status: "failure",
                message: "Some error occurred in retrieving places from database",
                error: err,
            })
        }
    
        return res.status(200).json({
            status: "success",
            message: "Retrived all the experinces",
            data: {
                Exps:exps,
            }
        })
    }).populate('user_id');
}

exports.exp_create = (req, res) => {
    const exp = new Exp({
        experience: req.body.experience,
        user_id: req.userData.user_id,
        place_id: req.params.placeID,
    })
    exp.save(async (err, newExp) => {
        if (err) {
            return res.json({
                status: "failure",
                message: "Some error occurred in creating the experience",
                error: err,
            })
        }
        newExp=await newExp.populate('user_id').execPopulate();
        console.log(newExp);
        return res.status(200).json({
            status: "success",
            message: "experience created",
            newExp: newExp,
        })
    })
}

exports.exp_delete_admin = (req, res) => {
    const expID = req.params.expID;
    Exp.findByIdAndDelete(expID, (err, exp) => {
        if (err) {
            return res.json({
                status: "failure",
                message: "Some error occurred in deleting the experience",
                error: err,
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Succesfully deleted experience",
            deletedExp: exp,
        })
    })
}
exports.exp_delete_user = (req, res) => {
    const expID = req.params.expID;
    Exp.findById(expID, (err, exp) => {
        if (err) {
            return res.json({
                status: "failure",
                message: "Some error occurred in deleting the experience",
                error: err,
            })
        }
        if (req.userData.user_id == exp.user_id) {
            exp.remove();
            return res.status(200).json({
                status: "success",
                message: "Succesfully deleted experience",
            })
        }
        else {
            return res.json({
                status: "failure",
                message: "This user doen't has access",
            })
        }

    })
}

exports.exp_update_likes = (req, res) => {
    const expID = req.params.expID;

    Exp.findById(expID, async (err, exp) => {
        if (err) {
            return res.json({
                status: "failure",
                message: "Some error occurred in updating the experience",
                error: err,
            })
        }

        //increment or decrement likes depending upon the type
        //like or unlike
        if(req.query.type=='like'){
            exp.likes = exp.likes + 1;
            exp.likedBy.push(req.userData.user_id)
        }else{
            exp.likes = exp.likes - 1;
            exp.likedBy=exp.likedBy.filter((value)=>{
                if(value!==req.userData.user_id){
                    return value
                }
            })
        }
        exp.save((err, updatedExp) => {
            if (err) {
                return res.json({
                    status: "failure",
                    message: "Some error occurred in updating the experince",
                    error: err,
                })
            }
            console.log(updatedExp.likedBy);
            return res.status(200).json({
                status: "success",
                message: "updated likes",
            })
        })
    })
}

exports.exp_update = (req, res) => {
    const expID = req.params.expID;
    Exp.findById(expID, (err, exp) => {
        if (err) {
            return res.json({
                status: "failure",
                message: "Some error occurred in updating the experience",
                error: err,
            })
        }
        if (req.userData.user_id == exp.user_id) {
            exp.experience = req.body.experience;
            exp.save((err, updatedExp) => {
                if (err) {
                    return res.json({
                        status: "failure",
                        message: "Some error occurred in updating the experince",
                        error: err,
                    })
                }
                console.log(updatedExp);
                return res.status(200).json({
                    status: "success",
                    message: "experience updated",
                    updatedExp: updatedExp,
                })
            })
        } else {
            return res.json({
                status: "failure",
                message: "This user doen't has access",
            })
        }

    })
}