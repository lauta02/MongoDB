const Product = require('../models/Products');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number
});

const Product = mongoose.model('Product', productSchema);

class ProductManager {
  async addProduct(product) {
    try {
      this.validateProduct(product);

      if (await Product.findOne({ code: product.code })) {
        throw new Error("Ya existe un producto con el mismo código.");
      }

      const newProduct = new Product(product);
      await newProduct.save();
      console.log(`Producto añadido: ${newProduct.title}`);
      return newProduct;
    } catch (error) {
      console.error("Error al agregar el producto:", error.message);
      throw error;
    }
  }

  async getProducts(limit) {
    try {
      const products = await Product.find().limit(limit);
      return products;
    } catch (error) {
      console.error("Error al obtener los productos:", error.message);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id);
      if (product) {
        return product;
      } else {
        throw new Error("Producto no encontrado.");
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error.message);
      throw error;
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      await Product.findByIdAndUpdate(id, updatedFields);
      console.log(`Producto actualizado con ID ${id}`);
    } catch (error) {
      console.error("Error al actualizar el producto:", error.message);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      await Product.findByIdAndDelete(id);
      console.log(`Producto eliminado con ID ${id}`);
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
      throw error;
    }
  }

  validateProduct(product) {
    const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"];

    for (const field of requiredFields) {
      if (!product[field]) {
        throw new Error(`El campo "${field}" es obligatorio.`);
      }
    }
  }
}

module.exports = ProductManager;
