import ticketsModel from "../../models/tickets.models.js"



export default class TicketsDao {
    createTicketDao = async (order) => {
        try {
            const result = await ticketsModel.create(order);
            return result;
        } catch (error) {
            throw new Error("creating ticket");
        }
    }
    getOrdersByEmailDao = async (email) => {
        try {
            const result = await ticketsModel.find({ purchaser: email });
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}