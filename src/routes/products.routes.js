import { Router } from 'express';
import ProductsController from '../controllers/products.controller.js';





export default class productsRoutes {
    path = '/products';
    router = Router();
    productsController = new ProductsController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        //insertar productos a la base de datos
        this.router.get(`${this.path}/insertion`, this.productsController.insertionProductsController);

        //mostrar todos los productos
        this.router.get(`${this.path}`, this.productsController.getallController);

        //mostrar un producto por id
        this.router.get(`${this.path}/:pid`, this.productsController.getProductsByIdController);

        //borrar un producto por id
        this.router.delete(`${this.path}/:pid`, this.productsController.deleteProductController);

        //agregar un producto
        this.router.post(`${this.path}`, this.productsController.addProductController);

        //actualizar un producto por id
        this.router.put(`${this.path}/:pid`,this.productsController.updateProductController);
    }
}
