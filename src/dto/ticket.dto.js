class TicketDTO {
    constructor(ticketData) {
        this.ticketCode = ticketData.code;
        this.ticketPurchaseDatetime = ticketData.purchase_datetime;
        this.ticketAmount = ticketData.amount;
        this.ticketPurchaser = ticketData.purchaser;
    }
}

module.exports = TicketDTO;