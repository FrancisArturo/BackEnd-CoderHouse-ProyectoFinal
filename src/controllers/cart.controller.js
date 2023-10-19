import { EMAIL, PHONE } from "../config/config.js";
import { CartsService, ProductsService, TicketsService, UsersService } from "../repositories/index.js";
import { transporter } from "../utils/transporter.js";
//import { client } from "../utils/twilioClient.js";


export default class CartsController {
    cartsService;
    ticketService;
    usersService;
    productsService;
    constructor() {
        this.cartsService = CartsService;
        this.ticketService = TicketsService;
        this.usersService = UsersService;
        this.productsService = ProductsService;
    }
    getProductsCartController = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.cartsService.getCartById(cid);
            if (!cart) {
                return res.json({
                    message: "Cart does not exist",
                })
            };
            return res.json({
                message: "Cart retrieved successfully",
                data: cart.products,
            });
            //res.render("cart", { cartProducts, cid });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    addProductCartController = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const quantityProduct = req.body;
            const checkCart = await this.cartsService.getCartById(cid);
            if (!checkCart) {
                return res.json({
                    message: "Cart not found",
                })
            };
            const checkProduct = await this.productsService.getProductById(pid);
            if (!checkProduct) {
                return res.json({
                    message: "Product not found",
                })
            };
            const addProduct = await this.cartsService.addProductCart(cid, pid, quantityProduct.quantity);
            return res.json({
                message: "Product added successfully",
                data: addProduct
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    deleteProductCartController = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const checkCart = await this.cartsService.getCartById(cid);
            if (!checkCart) {
                return res.json({
                    message: "Cart not found",
                })
            };
            const checkProduct = await this.productsService.getProductById(pid);
            if (!checkProduct) {
                return res.json({
                    message: "Product not found",
                })
            };
            const cart = await this.cartsService.deleteProductCart(cid, pid);
            return res.json({
                message: "Product deleted successfully",
                data: cart
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    deleteProductsCartController = async (req, res) => {
        try {
            const { cid } = req.params;
            const checkCart = await this.cartsService.getCartById(cid);
            if (!checkCart) {
                return res.json({
                    message: "Cart not found",
                })
            };
            const cart = await this.cartsService.deleteProductsCart(cid);
            return res.json({
                message: "Cart products deleted successfully",
                data: cart
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    deleteCartByIdController = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.cartsService.getCartById(cid);
            if (!cart) {
                return res.json({
                    message: "Cart does not exist",
                })
            };
            const deleteCart = await this.cartsService.deleteCartById(cid);
            return res.json({message: "Cart delete successfully", deleteCart});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    updateProductCartController = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const checkCart = await this.cartsService.getCartById(cid);
            if (!checkCart) {
                return res.json({
                    message: "Cart not found",
                })
            };
            const checkProduct = await this.productsService.getProductById(pid);
            if (!checkProduct) {
                return res.json({
                    message: "Product not found",
                })
            };
            const updateProduct = await this.cartsService.updateProductCart(cid, pid, quantity);
            return res.json({
                message: "Product quantity updated successfully",
                data: updateProduct
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    purchaseCartController = async (req, res) => {
        try {
            const { cid } = req.params;
            const user = req.user;
            let total = 0;
            let order;
            const checkCart = await this.cartsService.getCartById(cid);
            if (!checkCart) {
                return res.json({
                    message: "Cart not found",
                })
            };
            const result = await this.cartsService.purchaseCart(cid);
            for (let obj in result) {
                let objectId = String(result[obj].id);
                let objectIdMatch = objectId.match(/[0-9a-f]{24}/i);
                let productId = objectIdMatch[0]
                await this.cartsService.deleteProductCart(cid, productId);
                total += result[obj].price;
            };
            if (total === 0) {
                const cartProducts = checkCart.products;
                return res.render('ticket', {cartProducts});
            };
            order = {
                code:  Math.floor(Math.random() * (1000000000 - 10000000 + 1) + 10000000),
                purchase_datetime: Date.now(),
                amount: total,
                purchaser: user.user.email,
            };
            const updateCartProducts = await this.cartsService.getCartById(cid);
            const cartProducts = updateCartProducts.products;
            const Ticketcreate = await this.ticketService.createTicket(order);
            const sendEmail = transporter.sendMail({
                from: EMAIL,
                to: user.user.email,
                subject: `Purchase ticket ecommerce`,
                html: `
                <div>
                    <h2>Ticket N°: ${Ticketcreate.code}</h2>
                    <div>
                        <p>purchase_datetime: ${Ticketcreate.purchase_datetime}</p>
                        <p>amount: $ ${Ticketcreate.amount}</p>
                        <p>purchaser: ${Ticketcreate.purchaser}</p>
                    </div>
                </div>
                `,
            });
            // const userFound = await this.usersService.getUserById(user.user.user);
            // if (userFound.phone) {
            //     const sendSms = await client.messages.create({
            //     body: `Thanks for your Purchase ${user.user.firstName} ${user.user.lastName}, your ticket N° is: ${Ticketcreate.code}`,
            //     from: PHONE,
            //     to: `+${userFound.phone}`,
            //     })
            // };
            return res.render('ticket', {Ticketcreate, cartProducts});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
