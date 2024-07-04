const messageModel = require('../dao/mongo/models/message.model');

const socketChat = (io) => {
    let logs = [];

    io.on('connection', (socket) => {
        socket.on("message", async (data) => {
            const newMessage = {
                email: data.email,
                content: data.message,
                createdAt: data.createdAt
            };

            logs.push(newMessage);
            try {
                await messageModel.create(newMessage);
                io.emit('log', { logs });
            } catch (error) {
                console.error("Error saving message:", error);
            }
        });
    });
};

module.exports = socketChat;
