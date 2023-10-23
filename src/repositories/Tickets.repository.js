

export default class TicketsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    createTicket = async (order) => {
        const result = await this.dao.createTicketDao(order);
        return result;
    }
    getOrdersByEmail = async (email) => {
        const result = await this.dao.getOrdersByEmailDao(email);
        return result;
    }
}