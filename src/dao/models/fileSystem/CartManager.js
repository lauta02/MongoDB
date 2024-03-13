const Cart = require('../../models/Carts');

class CartManager {
  async addCart() {
    try {
      const newCart = new Cart({ id: mongoose.Types.ObjectId(), products: [] });
      await newCart.save();
      console.log(`Carrito creado con ID: ${newCart.id}`);
    } catch (error) {
      console.error("Error al crear el carrito:", error.message);
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      const existingProductIndex = cart.products.findIndex(p => p.product === productId);

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      console.log(`Producto añadido al carrito con ID ${cartId}: ${productId}`);
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error.message);
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      if (cart) {
        return cart;
      } else {
        throw new Error("Carrito no encontrado.");
      }
    } catch (error) {
      console.error("Error al obtener el carrito:", error.message);
      throw error;
    }
  }
}

module.exports = CartManager;