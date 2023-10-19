import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";


const productsSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true, max: 100 },
    stock: { type: Number, required: true },
    category: { type: String, required: true, max: 100 },
    thumbnail: { type: String, max: 100 },
    owner: { type: String, default: "admin"}
});


productsSchema.plugin(mongoosePaginate);
export const productsModel = mongoose.model(productsCollection, productsSchema);