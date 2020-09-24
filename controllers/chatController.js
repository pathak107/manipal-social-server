const WebSocket = require('ws');
const Chat = require('../models/chats')
const jwt = require('jsonwebtoken');

exports.createWebSocketServer=(server)=>{
    const wss = new WebSocket.Server({ server });

    wss.on('connection', async function connection(ws) {
        var chatMessages = await Chat.find().populate('user_id').limit(10).sort({ createdAt: 'desc' });
        console.log(chatMessages);
        var recentMessages = [];

        //populating the recent messages
        for(let i=0;i<chatMessages.length;i++){
            recentMessages.push({
                _id: chatMessages[i]._id,
                name: chatMessages[i].user_id.name,
                email: chatMessages[i].user_id.email,
                message: chatMessages[i].message
            })
        }

        ws.send(JSON.stringify(recentMessages));

        console.log("A new device has been connected")
        ws.on('message', async function incoming(data) {
            let message = JSON.parse(data);

            //extracting user id from headers
            const token = message.jwtToken;
            const decoded = await jwt.verify(token, `${process.env.JWT_SECRET}`);

            //storing in the database
            var newMessage = Chat({
                message: message.message,
                user_id: decoded.user_id
            })
            newMessage.save((err, newMsg) => {
                recentMessages.unshift({
                    _id: newMsg._id,
                    name: message.name,
                    email: message.email,
                    message: message.message
                });
                while(recentMessages.length>10){
                    recentMessages.pop();
                }
                
                console.log(recentMessages);

                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(recentMessages));
                    }
                });
            })
        });
    });
}

exports.deleteChat=(req,res)=>{
    const chatID = req.params.chatID;
    Chat.findById(chatID, (err, chat) => {
        if (err) {
            return res.json({
                status: "failure",
                message: "Some error occurred in deleting the chat",
                error: err,
            })
        }
        if (req.userData.user_id == chat.user_id) {
            chat.remove();
            return res.status(200).json({
                status: "success",
                message: "Succesfully deleted chat",
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



