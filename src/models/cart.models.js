import mongoose  from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: []
  }
});

cartSchema.pre("findById", function () {

  this.populate("products.product");
});

export const cartModel = mongoose.model(cartCollection, cartSchema);