import fs from "fs";
import ProductManager from "./Manager.js";


export default class CartManager {
    

    constructor () {
        this.path = "./src/files/carrito.json";
    }

    addCart = async () => {
        const cart = {
            id: this.id,
            products: []
        }

        const carts = await this.getCarts();

        if (carts.length === 0) {
            cart.id = 1;
        } else {
            cart.id = carts[carts.length - 1].id + 1;
        }
        carts.push(cart);
        fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return carts;
    }

    getCarts = async () => {
        if (fs.existsSync(this.path) ) {
            const carts = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(carts);   
        } else {
            return [];
        }
    }


    getProductsCart = async (id) => {
        const carts = await this.getCarts();
        for (let obj in carts) {
            if (carts[obj].id == id) {
                return carts[obj].products;
            }
        }
        return "Carrito no encontrado";
    }

    addProductCart = async (cid, pid ) => {
        const products = await this.getProductsCart(cid);
        const carts = await this.getCarts();
        const newProduct = {
            product: pid,
            quantity: 1
        }
        if (products === "Carrito no encontrado") {
            return "Carrito no encontrado";
        }

        
        const manager = new ProductManager();
        const productInList = await manager.getProductById(pid);
        if (productInList === "Not found") {
            return "Producto no encontrado";
        }

        const productoRepetido = products.find((obj) => { return obj.product == pid});
        if (productoRepetido == undefined) {
            products.push(newProduct);
        } else {
            for (let obj in products) {
                if (products[obj].product == pid) {
                    products[obj].quantity++;
                }
            }
        }

        for (let obj in carts) {
            if (carts[obj].id == cid) {
                carts[obj].products = products;
            }
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return carts;
    }
}

    
