import { cartModel } from "../../models/cart.models.js";
import { productsModel } from "../../models/products.models.js";

export default class CartsDao {
    addCartDao = async () => {
        try {
            const cart = {
            products: []
            };
            const newCart = await cartModel.create(cart);
            return newCart;
        } catch (error) {
            throw new Error("creating cart error");
        }
    }
    getCartByIdDao = async (cid) => {
        try {
            const cart = await cartModel.findById(cid).populate("products.product");
            return cart;
        } catch (error) {
            throw new Error("get products cart error");
        }

    }
    addProductCartDao = async (cid, pid, quantityProduct) => {
        try {
            const cart = await cartModel.findById(cid);
            if (cart.products.length === 0) {
                cart.products.push({product: pid, quantity: quantityProduct});
                await cart.save();
                const cartupdated = await cartModel.findById(cid).populate("products.product");
                return cartupdated.products;
                //return cart;
            }
            if (cart.products.length > 0) {
                for (let obj in cart.products) {
                    if (cart.products[obj].product == pid) {
                        cart.products[obj].quantity += parseInt(quantityProduct);
                        await cart.save();
                        const cartupdated = await cartModel.findById(cid).populate("products.product");
                        return cartupdated.products;
                        //return cart;
                    }
                }
            }
            cart.products.push({product: pid, quantity: quantityProduct});
            await cart.save();
            const cartupdated = await cartModel.findById(cid).populate("products.product");
            return cartupdated.products;
        } catch (error) {
            throw new Error(error);
        }
    }
    deleteProductCartDao = async (cid, pid) => {
        try {
            const cart = await cartModel.findById(cid);
            for (let obj in cart.products) {
                if (cart.products[obj].product == pid) {
                    cart.products.splice(obj, 1);
                    await cart.save();
                    const cartUpdate = await cartModel.findById(cid).populate("products.product");
                    return cartUpdate.products;
                };
            };
        } catch (error) {
            throw new Error(error);
        }
    }
    deleteProductsCartDao = async (cid) => {
        try {
            const cart = await cartModel.findById(cid);
            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("delete products cart error");
        }
        
    }
    deleteCartByIdDao = async (cid) => {
        try {
            const deleteCart = await cartModel.deleteOne({ _id: cid });
            return deleteCart;
        } catch (error) {
            throw new Error(error);
        }
    }
    updateProductCartDao = async (cid, pid, quantity) => {
        try {
            const cart = await cartModel.findById(cid);
            for (let obj in cart.products) {
                if (cart.products[obj].product == pid) {
                    cart.products[obj].quantity = quantity;
                    await cart.save();
                    const cartupdated = await cartModel.findById(cid).populate("products.product");
                    return cartupdated;
                };
            };
        } catch (error) {
            throw new Error("update product cart error");
        }
    }
    purchaseCartDao = async (cid) => {
        try {
            let productsOrder = [];
            let productPrice;
            const cart = await cartModel.findById(cid);
            for (let obj in cart.products) {
                const productInList = await productsModel.findById(cart.products[obj].product);
                if (productInList.stock >= cart.products[obj].quantity) {
                    productPrice = cart.products[obj].quantity * productInList.price;
                    let product = {
                        id: cart.products[obj].product,
                        quantity: cart.products[obj].quantity,
                        price: productPrice
                    };
                    productsOrder.push(product);
                    await productsModel.updateOne({ _id: cart.products[obj].product }, {stock: productInList.stock - cart.products[obj].quantity});
                };
            };
            return productsOrder;
        } catch (error) {
            throw new Error("Purchase products in cart error");
        }
    }
}


