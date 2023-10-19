import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {type: String, unique: true},
    purchase_datetime: Date,
    amount: Number,
    purchaser: String
})

const ticketsModel = mongoose.model("tickets", ticketSchema)

export default ticketsModel