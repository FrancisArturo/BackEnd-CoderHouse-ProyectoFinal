import { EMAIL } from '../config/config.js';
import { ProductsService } from '../repositories/index.js';
import { transporter } from '../utils/transporter.js';
import CustomError from "../utils/error-handler.js";
import EnumsErrors from "../utils/error-enums.js";
import { GetProductsInfoError, generateGetProductInfoError, productExistsInfoError } from '../utils/error-info.js';


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
            if (products.length == 0) {
                CustomError.createError({
                    name: "get all products error",
                    cause: GetProductsInfoError(),
                    message: "products not found",
                    code: EnumsErrors.PRODUCT_MISSING_ERROR
                });
            } 
            return res.json({
                message: "Products retrieved successfully",
                data: products
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    getProductsByIdController = async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await this.productsService.getProductById(pid);
            if (product.name == "CastError") {
                CustomError.createError({
                    name: "get product by id error",
                    cause: generateGetProductInfoError(product),
                    message: "product not found",
                    code: EnumsErrors.PRODUCT_MISSING_ERROR
                });
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
                CustomError.createError({
                    name: "add product error",
                    cause: productExistsInfoError(checkProduct),
                    message: "Product already exists",
                    code: EnumsErrors.PRODUCT_EXIST_ERROR
                });
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
            if (productFind.name == "CastError") {
                CustomError.createError({
                    name: "get product by id error",
                    cause: generateGetProductInfoError(productFind),
                    message: "product not found",
                    code: EnumsErrors.PRODUCT_MISSING_ERROR
                });
            }
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
            if (productFind.name == "CastError") {
                CustomError.createError({
                    name: "get product by id error",
                    cause: generateGetProductInfoError(productFind),
                    message: "product not found",
                    code: EnumsErrors.PRODUCT_MISSING_ERROR
                });
            }
            const productDelete = await this.productsService.deleteProduct(pid);
            if (productFind.owner != "admin") {
                transporter.sendMail({
                    from: EMAIL,
                    to: productFind.owner,
                    subject: `Ecommerce product removed`,
                    html: `
                    <div>
                        <h4>Hello! we inform you that your following product was eliminated from ecommerce</h4>
                        <div>
                            <p>Title: ${productFind.title}</p>
                            <p>Price: ${productFind.price}</p>
                        </div>
                    </div>
                    `,
                });
            }
            return res.json({
                message: "Product deleted successfully",
                data: productDelete
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        };
    }
    
}