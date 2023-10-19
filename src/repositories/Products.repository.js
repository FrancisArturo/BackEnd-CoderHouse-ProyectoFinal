

export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    insertionProducts = async () => {
        let result = await this.dao.insertionProductsDao();
        return result;
    }
    getall = async () => {
        let result = await this.dao.getallDao();
        return result;
    }
    getallProducts = async (limit, page, category, sort) => {
        let result = await this.dao.getallProductsDao(limit, page, category, sort);
        return result;
    }
    getProductById = async (pid) => {
        let result = await this.dao.getProductByIdDao(pid);
        return result;
    }
    getProductByTitle = async (product) => {
        let result = await this.dao.getProductByTitleDao(product);
        return result;
    }
    addProduct = async (product) => {
        let result = await this.dao.addProductDao(product);
        return result;
    }
    updateProduct = async (pid, product) => {
        let result = await this.dao.updateProductDao(pid, product);
        return result;
    }
    deleteProduct = async (pid) => {
        let result = await this.dao.deleteProductDao(pid);
        return result;
    }

}