import fs from "fs";

export default class ProductManager {
    constructor () {
        this.path = "./src/files/productos.json";
    }


    addProduct = async (title, description, code, price, status, stock, category,  thumbnail) => {

        const product = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail
        }

        const products = await this.getProducts();

        

        for (let obj in products) {
            if (products[obj].code == product.code) {
                return ("El código ya existe");
            }
        }

        if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category) {
            return ("Faltan datos");
        }

        if (products.length === 0) {
            product.id = 1;
        } else {
            product.id = products[products.length - 1].id + 1;
        }

        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
        return products;
    }

    getProducts = async () => {
        if (fs.existsSync(this.path) ) {
            const products = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(products);   
        } else {
            return [];
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        for (let obj in products) {
            if (products[obj].id == id) {
                return products[obj];
            }
        }
        return "Not found";
    }

    deleteProductById = async (id) => {
        const products = await this.getProducts();
        const product = await this.getProductById(id);
        if (product == "Not found") {
            return product;
        } else {
            products.splice(products.findIndex(element => element.id == product.id), 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return products;
        }
    }

    updateProductById = async (id, updateObj) => {
        const products = await this.getProducts();
        const product = await this.getProductById(id);
        if (product == "Not found") {
            return product;
        } else {
            for (let obj in products) {
                if (products[obj].id == id) {
                    for (let key in updateObj) {
                        products[obj][key] = updateObj[key];
                    }
                }
            }          
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return products;
        }
    }
}