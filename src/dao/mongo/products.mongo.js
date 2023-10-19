import { productsModel } from '../../models/products.models.js';
import products from '../../files/products.js';

export default class ProductsDao {
    insertionProductsDao = async () => {
        try {
            const result = await productsModel.insertMany(products);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
    getallDao = async () => {
        try {
            const result = await productsModel.find();
            return result;
        } catch (error) {
            throw new Error("No products found");
        }
    }       
    getallProductsDao = async (limit, page, category, sort) => {
        try {
            if (category === "all") {
                const products = await productsModel.paginate({}, { limit, page, lean : true, sort: sort && { price: sort } });
                if (products.length === 0) {
                    return ("No products found");
                }
                return products;
            }
            else {
                const products = await productsModel.paginate({category : category}, { limit, page, lean : true, sort: sort && { price: sort } })
                if (products.length === 0) {
                    return ("No products found");
                }
                return products;
            }
        } catch (error) {
            throw new Error("Error getting products");
        }
    }
    getProductByIdDao = async (pid) => {
        try {
            const product = await productsModel.findById({_id: pid});
            return product;
        } catch (error) {
            throw new Error("Error getting product"); 
        }
    }
    getProductByTitleDao = async (product) => {
        try {
            const checkProduct = await productsModel.findOne({ title: product.title });
            return checkProduct;
        } catch (error) {
            throw new Error(error); 
        }
    }
    addProductDao = async (product) => {
        try {
            const newProduct = new productsModel(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw new Error("Error adding product");
        }
    }
    updateProductDao = async (pid, product) => {
        try {
            await productsModel.updateOne({ _id: pid }, product);
            const prodUpdated =  await productsModel.findById({_id: pid});
            return prodUpdated;
        } catch (error) {
            throw new Error("Error updating product");
        }
    }
    deleteProductDao = async (pid) => {
        try {
            await productsModel.deleteOne({ _id: pid });
            const resultProducts = await productsModel.find();
            return resultProducts;
        } catch (error) {
            throw new Error("Error deleting product");
        }
    }
}