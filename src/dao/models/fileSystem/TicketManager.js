const fs = require('fs').promises;

class TicketManagerFile {
    constructor() {
        this.filename = './src/dao/filesystem/data/tickets.json';
        this.initializeFile();
    }

    async initializeFile() {
        try {
            await fs.access(this.filename);
        } catch (error) {
            await fs.writeFile(this.filename, '[]');
        }
    }

    async getTickets() {
        try {
            const data = await fs.readFile(this.filename, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error('Failed to fetch tickets:', error);
        }
    }

    async getTicketById(tid) {
        try {
            const tickets = await this.getTickets();
            return tickets.find(ticket => ticket.id === tid);
        } catch (error) {
            throw new Error('Failed to fetch ticket by ID:', error);
        }
    }

    async getTicketByCode(code) {
        try {
            const tickets = await this.getTickets();
            return tickets.find(ticket => ticket.code === code);
        } catch (error) {
            throw new Error('Failed to fetch ticket by code:', error);
        }
    }

    async generateTicket(ticket) {
        try {
            const tickets = await this.getTickets();

            if (ticket.code && ticket.purchase_datetime && ticket.amount && ticket.purchaser) {
                const newTicket = {
                    id: tickets.length + 1,
                    code: ticket.code,
                    purchase_datetime: ticket.purchase_datetime,
                    amount: ticket.amount,
                    purchaser: ticket.purchaser
                };
                tickets.push(newTicket);
                await this.saveTickets(tickets);
                return newTicket;
            } else {
                throw new Error("Missing required ticket details");
            }
        } catch (error) {
            throw new Error('Error generating ticket:', error);
        }
    }

    async deleteTicket(tid) {
        try {
            let tickets = await this.getTickets();
            tickets = tickets.filter(ticket => ticket.id !== tid);
            await this.saveTickets(tickets);
        } catch (error) {
            throw new Error('Error deleting ticket:', error);
        }
    }

    async saveTickets(tickets) {
        try {
            await fs.writeFile(this.filename, JSON.stringify(tickets, null, 2), 'utf8');
        } catch (error) {
            throw new Error('Failed to save tickets:', error);
        }
    }
}

module.exports = TicketManagerFile;