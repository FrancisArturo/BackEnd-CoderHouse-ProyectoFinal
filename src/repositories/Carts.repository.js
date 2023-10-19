

export default class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    addCart = async () => {
        let result = await this.dao.addCartDao();
        return result;
    }
    getCartById = async (cid) => {
        let result = await this.dao.getCartByIdDao(cid);
        return result;
    }
    addProductCart = async (cid, pid, quantityProduct) => {
        let result = await this.dao.addProductCartDao(cid, pid, quantityProduct);
        return result;
    }
    deleteProductCart = async (cid, pid) => {
        let result = await this.dao.deleteProductCartDao(cid, pid);
        return result;
    }
    deleteProductsCart = async (cid) => {
        let result = await this.dao.deleteProductsCartDao(cid);
        return result;
    }
    deleteCartById = async (cid) => {
        let result = await this.dao.deleteCartByIdDao(cid);
        return result;
    }
    updateProductCart = async (cid, pid, quantity) => {
        let result = await this.dao.updateProductCartDao(cid, pid, quantity);
        return result;
    }
    purchaseCart = async (cid) => {
        let result = await this.dao.purchaseCartDao(cid);
        return result;
    }
}