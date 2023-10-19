export default class ProductsDto {
    constructor(product){
        const { name, description, quantity, price } = product;
        this.name = name.toLowerCase();
        this.description = description;
        this.quantity = parseInt(quantity);
        this.price = parseInt(price);
    }
}