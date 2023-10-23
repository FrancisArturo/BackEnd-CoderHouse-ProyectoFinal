import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {type: String, unique: true},
    purchase_datetime: Date,
    products: {
        type: [
            {
                title: String,
                quantity: Number,
                price: Number,
            },
        ],
    },
    amount: Number,
    purchaser: String
})

const ticketsModel = mongoose.model("tickets", ticketSchema);

export default ticketsModel