const mongoose = require('mongoose');

const MESSAGE_COLLECTION = 'messages';

const MessageSchema = new mongoose.Schema({
    senderEmail: {
        type: String,
        required: true,
        trim: true
    },
    messageContent: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Message = mongoose.model(MESSAGE_COLLECTION, MessageSchema);

module.exports = Message;