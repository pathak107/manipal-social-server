//bcrypt for password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

//jwt for token
const jwt = require('jsonwebtoken');

//importing models
const User = require('../models/users');

exports.user_register = (req, res) => {
    console.log(req.body.password);
    console.log(req.body.email);
    console.log(req.body.name);
    console.log(req.body.phoneNumber);
    //checking if the user does not already exists
    User.find({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err)
            return res.json({
                status: "failure",
                message: "Some unknown error occurred with database",
                error: err,
            })
        }
        else if (user.length >= 1) {
            return res.status(409).json({
                status: "failure",
                message: "User already exists with the same email.",

            })
        }
        else {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                if (err || req.body.password=="") {
                    return res.json({
                        status: "failure",
                        message: "Failed to create new user.",
                        error: err,
                    })
                }
                // Store hash in your password DB.
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    phoneNumber: req.body.phoneNumber
                })

                user.save((err, newUser) => {
                    if (err) {
                        console.log(err)
                        return res.json({
                            status: "failure",
                            message: "Failed to create new user.",
                            error: err,
                        })
                    }
                    const token = jwt.sign(
                        {
                            user_id: newUser._id,
                            email: newUser.email,
                            name: newUser.name,
                            phoneNumber: newUser.phoneNumber
                        },
                        `${process.env.JWT_SECRET}`,
                        {
                            expiresIn: "7d"
                        }
                    )
                    return res.status(200).json({
                        status: "success",
                        message: "Created new user successfully.",
                        token: token,
                        data: {
                            name:newUser.name,
                            email:newUser.email,
                            phoneNumber:newUser.phoneNumber
                        }
                    })
                })
            });
        }
    });
}



exports.user_login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        console.log(err)
        if (err) {
            return res.json({
                status: "failure",
                message: "Some unknown error occurred with database",
                error: err,

            })
        }

        //if there is no user with that email
        if (user == null || user == undefined) {
            return res.json({
                status: "failure",
                message: "Email or password provided is incorrect.",

            })
        }

        //if user does exist then simply match the passwords
        bcrypt.compare(req.body.password, user.password, function (err, result) {
            // result == true
            if (result == true) {
                const token = jwt.sign(
                    {
                        user_id: user._id,
                        email: user.email,
                        name: user.name,
                        phoneNumber: user.phoneNumber
                    },
                    'secret',
                    {
                        expiresIn: "7d"
                    }
                )
                return res.status(200).json({
                    status: "success",
                    message: "User Authenticated",
                    token: token,
                    data: user

                })
            }
            else {
                return res.json({
                    status: "failure",
                    message: "Email or password incorrect.",
                })
            }
        });

    })
}

exports.user_get_all = (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.json({
                status: "failure",
                message: "Some error occurred with database",
                error: err
            })
        }
        return res.json({
            status: "success",
            message: "All the users",
            data: users
        })

    })
}

exports.user_delete = (req, res) => {
    const userID = req.params.userID;
    User.findByIdAndDelete(userID, (err, doc) => {
        if (err) {
            return res.json({
                status: "failure",
                message: "Some error occurred with database",
                error: err
            })
        }
        else {
            return res.json({
                status: "success",
                message: "Deleted the user",
                data: doc
            })
        }
    });
}


//Firebase cloud messaging token for push notifications
exports.store_fcmToken = (req, res) => {
    const fcmToken = req.params.fcmToken;
    if (fcmToken != null) {
        User.updateOne({ _id: req.userData.user_id }, { $set: { fcmToken: fcmToken } }, (err, user) => {
            if (err || user == null || user == undefined) {
                return res.json({
                    status: "failure",
                    message: "Some error occured with database and server"
                })
            }
            else {
                return res.status(200).json({
                    status: "success",
                    message: "Fcm token stored successfully"
                })
            }
        })
    }
    else {
        return res.json({
            status: "failure",
            message: "No fcm token provided"
        })
    }
}
