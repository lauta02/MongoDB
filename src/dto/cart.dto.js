class CartDTO {
    constructor(cartData) {
        this.cartProducts = cartData.products.map(product => ({
            productId: product.product._id,
            quantity: product.quantity
        }));
    }
}

module.exports = CartDTO;