const WebSocket = require('ws');
const Chat = require('../models/chats')
const jwt = require('jsonwebtoken');

exports.createWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', async function connection(ws) {
        var chatMessages = await Chat.find().populate('user_id').limit(15).sort({ createdAt: 'desc' });
        var recentMessages = [];

        //populating the recent messages
        for (let i = 0; i < chatMessages.length; i++) {
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
            if (message.type == 'chat') {
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
                    while (recentMessages.length > 10) {
                        recentMessages.pop();
                    }

                    wss.clients.forEach(function each(client) {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(recentMessages));
                        }
                    });
                })
            }
            
            else if (message.type == 'deleteChat') {
                const chatID = message.chatID;
                Chat.findById(chatID, (err, chat) => {
                    if (err) {
                        console.log("error occurred")
                    }
                    if (decoded.user_id == chat.user_id) {
                        chat.remove();

                        recentMessages = recentMessages.filter((value) => {
                            return value._id != chatID;
                        });
                        wss.clients.forEach(function each(client) {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify(recentMessages));
                            }
                        });
                    }
                })
            }

        });
    });
}


