const TicketDataTransferObject = require('../dto/ticket.dto')

class TicketRepositoryWrapper{
    constructor(dataAccessObject){
        this.dataAccessObject = dataAccessObject
    }

    async createNewTicket(ticketInfo){
        const ticketDTO = new TicketDataTransferObject(ticketInfo)
        const result = this.dataAccessObject.addTicketToDatabase(ticketDTO)
        return result
    }

    async fetchAllTickets(){
        const result = this.dataAccessObject.retrieveAllTickets()
        return result
    }

    async fetchTicketById(ticketIdentifier){
        const result = this.dataAccessObject.retrieveTicketById(ticketIdentifier)
        return result
    }

    async findTicketByCode(ticketCode){
        const result = this.dataAccessObject.retrieveTicketByCode(ticketCode)
        return result
    }

    async removeTicket(ticketIdentifier){
        const result = this.dataAccessObject.deleteTicketFromDatabase(ticketIdentifier)
        return result
    }
}

module.exports = TicketRepositoryWrapper