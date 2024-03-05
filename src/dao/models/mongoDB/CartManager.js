const Cart = require('../models/Carts');

class CartManager {
  async updateCart(cartId, products) {
    try {
      const cart = await Cart.findByIdAndUpdate(cartId, { products }, { new: true });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findByIdAndUpdate(cartId, { $pull: { products: productId } }, { new: true });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await Cart.findOneAndUpdate(
        { _id: cartId, 'products.product': productId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
      );
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      const cart = await Cart.findByIdAndUpdate(cartId, { products: [] }, { new: true });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado.');
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartManager;