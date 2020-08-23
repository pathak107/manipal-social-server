require('dotenv').config()
const express=require('express');
const app=express();

//settig up body parse
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//connection for mongoDB
const mongoose = require('mongoose');
mongoose.connect(`${process.env.DB_URL}`, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true, });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database")
});

//Importing controllers
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const placeRoute = require('./routes/place');
const experienceRoute = require('./routes/experience');
const eventRoute = require('./routes/event');
const chatRoute = require('./routes/chat');

//initializing routes
app.use('/admin',adminRoute);
app.use('/user',userRoute);
app.use('/places',placeRoute);
app.use('/experiences',experienceRoute);
app.use('/event',eventRoute);
app.use('/chats',chatRoute);

//404 page
app.use((req,res)=>{
    res.status(404).json({
        status:"failure",
        message:"This route does not exist",
        data:null
    })
})
const port=3000||process.env.PORT;
app.listen(port,()=>{
    console.log("server started at port "+ port)
})