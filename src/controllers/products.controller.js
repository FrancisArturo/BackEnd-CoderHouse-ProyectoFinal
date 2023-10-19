import { ProductsService } from '../repositories/index.js';


export default class ProductsController {
    productsService;
    constructor(){
        this.productsService = ProductsService;
    }
    insertionProductsController = async (req, res ) => {
        try {
            const result = await this.productsService.insertionProducts();
            res.json({
                message: "Products inserted successfully",
                data: result
            })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    getallController = async (req, res) => {
        try {
            const products = await this.productsService.getall();
            return res.json({
                message: "Products retrieved successfully",
                data: products
            })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    getProductsByIdController = async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await this.productsService.getProductById(pid);
            if (!product) {
                return res.json({
                    message: "No product found",
                })
            }
            return res.json({
                message: "Product retrieved successfully",
                data: product
            })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    addProductController = async (req, res) => {
        try {
            const { body } = req;
            const checkProduct = await this.productsService.getProductByTitle(body);
            if (checkProduct) {
                return res.json({
                    message: "Product already exists",
                })
            };
            const addProduct = await this.productsService.addProduct(body);
            return res.json({
                message: "Product added successfully",
                data: addProduct
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        };
    }
    updateProductController = async (req, res) => {
        try {
            const { pid } = req.params;
            const productFind = await this.productsService.getProductById(pid);
            if (productFind === "No product found") {
                return res.json({
                    message: "No product found",
                })
            };
            const product = req.body;
            const updateProduct = await this.productsService.updateProduct(pid, product);
            return res.json({
                message: "Product updated successfully",
                data: updateProduct
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    deleteProductController = async (req, res) => {
        try {
            const { pid } = req.params;
            const productFind = await this.productsService.getProductById(pid);
            if (productFind == "No product found") {
                return res.json({
                    message: "No product found",
                })
            };
            const productDelete = await this.productsService.deleteProduct(pid);
            return res.json({
                message: "Product deleted successfully",
                data: productDelete
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        };
    }
    
}