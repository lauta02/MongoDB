const mongoose = require('mongoose');

const TICKETS_COLLECTION = 'tickets';

const TicketSchema = new mongoose.Schema({
    ticketCode: {
        type: String,
        required: true,
        trim: true
    },
    purchaseDate: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    buyer: {
        type: String,
        required: true,
        trim: true
    }
});

const Ticket = mongoose.model(TICKETS_COLLECTION, TicketSchema);

module.exports = Ticket;