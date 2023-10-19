import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
import handlePolicies from "../middleware/handle-police.middleware.js";


export default class cartRoutes {
    path = "/carts";
    router = Router();
    cartController = new CartController

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        //get products from cart
        this.router.get(`${this.path}/:cid`, this.cartController.getProductsCartController);

        //add product to cart
        this.router.post(`${this.path}/:cid/products/:pid`, this.cartController.addProductCartController);

        //delete product from cart
        this.router.delete(`${this.path}/:cid/products/:pid`, this.cartController.deleteProductCartController);

        //delete all products from cart
        this.router.delete(`${this.path}/:cid/products`, this.cartController.deleteProductsCartController);

        //update quantity product from cart
        this.router.put(`${this.path}/:cid/products/:pid`, this.cartController.updateProductCartController);

        //purchase products from cart
        this.router.get(`${this.path}/:cid/purchase`, handlePolicies(["user", "premium"]), this.cartController.purchaseCartController);
        
        //delete cart by Id
        this.router.delete(`${this.path}/:cid`, this.cartController.deleteCartByIdController);
    }
}