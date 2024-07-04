const fs = require('fs').promises;
const Cart = require('../mongoDB/cart.mongo');

class CartManagerFile {
  constructor() {
    this.filename = './src/dao/filesystem/data/carts.json';
    this.initializeFile();
  }

  async initializeFile() {
    try {
      await fs.access(this.filename);
    } catch (error) {
      await fs.writeFile(this.filename, '[]');
    }
  }

  async saveCarts(carts) {
    try {
      const data = JSON.stringify(carts);
      await fs.writeFile(this.filename, data, 'utf-8');
    } catch (error) {
      throw new Error('Failed to save carts:', error);
    }
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.filename, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Failed to get carts:', error);
    }
  }

  async getCartById(cid) {
    try {
      const carts = await this.getCarts();
      return carts.find(cart => cart.id === cid);
    } catch (error) {
      throw new Error('Failed to get cart by ID:', error);
    }
  }

  async addProductToCart(cid, pid, quantity) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(cart => cart.id === cid);
      if (!cart) {
        throw new Error('Cart not found');
      }
      const existingProduct = cart.products.find(prod => prod.product === pid);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity });
      }
      await this.saveCarts(carts);
      return cart;
    } catch (error) {
      throw new Error('Failed to add product to cart:', error);
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(cart => cart.id === cid);
      if (!cart) {
        throw new Error('Cart not found');
      }
      cart.products = cart.products.filter(product => product.product !== pid);
      await this.saveCarts(carts);
      return cart;
    } catch (error) {
      throw new Error('Failed to delete product from cart:', error);
    }
  }

  async updateCart(cid, products) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(cart => cart.id === cid);
      if (!cart) {
        throw new Error('Cart not found');
      }
      cart.products = products;
      await this.saveCarts(carts);
      return cart;
    } catch (error) {
      throw new Error('Failed to update cart:', error);
    }
  }

  async updateQuantity(cid, pid, quantity) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(cart => cart.id === cid);
      if (!cart) {
        throw new Error('Cart not found');
      }
      const product = cart.products.find(prod => prod.product === pid);
      if (!product) {
        throw new Error('Product not found in cart');
      }
      product.quantity = quantity;
      await this.saveCarts(carts);
      return cart;
    } catch (error) {
      throw new Error('Failed to update quantity:', error);
    }
  }

  async deleteAllProductsFromCart(cid) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(cart => cart.id === cid);
      if (!cart) {
        throw new Error('Cart not found');
      }
      cart.products = [];
      await this.saveCarts(carts);
      return cart;
    } catch (error) {
      throw new Error('Failed to delete all products from cart:', error);
    }
  }
}

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

module.exports = { CartManager, CartManagerFile };