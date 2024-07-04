class ShoppingCartRepository {
    constructor(dataAccessObject){
        this.dataAccessObject = dataAccessObject;
    }

    async createCart(){
        const response = await this.dataAccessObject.createCart();
        return response;
    }

    async addProduct(cartId, productId){
        const response = await this.dataAccessObject.addProductToCart(cartId, productId);
        return response;
    }

    async getAllCarts(){
        const response = await this.dataAccessObject.getAllCarts();
        return response;
    }

    async getCartById(cartId){
        const response = await this.dataAccessObject.getCartById(cartId);
        return response;
    }

    async updateCart(cartId, updatedProducts){
        const response = await this.dataAccessObject.updateCart(cartId, updatedProducts);
        return response;
    }

    async updateProductQuantity(cartId, productId, quantity){
        const response = await this.dataAccessObject.updateProductQuantity(cartId, productId, quantity);
        return response;
    }

    async removeProductFromCart(cartId, productId){
        const response = await this.dataAccessObject.removeProductFromCart(cartId, productId);
        return response;
    }

    async removeAllProducts(cartId){
        const response = await this.dataAccessObject.removeAllProductsFromCart(cartId);
        return response;
    }
}

module.exports = ShoppingCartRepository;