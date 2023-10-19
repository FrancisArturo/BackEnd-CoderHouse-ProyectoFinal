import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String, 
    phone: Number,
    age: Number,
    password: String,
    carts: {
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cart",
        }
    },
    documents: {
        type: [
            {
                name: String,
                reference: String,
            },
        ],
    },
    lastConnection: { type: Date, default: Date.now },
    role: {type: String, default: "user"},
});

userSchema.pre("findById", function () {

    this.populate("carts.cart");
});

const userModel = mongoose.model("users", userSchema);

export default userModel;