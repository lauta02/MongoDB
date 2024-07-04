const TicketModel = require('./models/ticket.model');

class TicketMongo {
    constructor(model) {
        this.ticketModel = model;
    }

    async getTickets() {
        try {
            return await TicketModel.find({});
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTicketById(tid) {
        try {
            return await TicketModel.findById(tid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTicketByCode(code) {
        try {
            return await TicketModel.findOne({ code: code });
        } catch (error) {
            throw new Error(error);
        }
    }

    async generateTicket(ticket) {
        try {
            return await TicketModel.create(ticket);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteTicket(tid) {
        try {
            return await TicketModel.findByIdAndDelete(tid);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = TicketMongo;