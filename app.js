require('dotenv').config()
const express=require('express');
const app=express();
const server=require('http').createServer(app);

//setting websocket for chat
const chatController=require('./controllers/chatController');
chatController.createWebSocketServer(server);

//settig up body parse
const bodyParser=require('body-parser');

//setting express static for logo
app.use(express.static('public'))

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
const cabRoute=require('./routes/cab');

//initializing routes
app.use('/admin',adminRoute);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); //this is necessary to use body-parser after admin bro

app.use('/user',userRoute);
app.use('/places',placeRoute);
app.use('/experiences',experienceRoute);
app.use('/event',eventRoute);
app.use('/chats',chatRoute);
app.use('/cabs',cabRoute);
app.use('/chats',chatRoute);

//404 page
app.use((req,res)=>{
    res.status(404).json({
        status:"failure",
        message:"This route does not exist",
        data:null
    })
})


server.listen(process.env.PORT||3000,()=>{
    console.log("server started");
});