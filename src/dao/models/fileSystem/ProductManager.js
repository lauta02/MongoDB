const fs = require('fs').promises;

class ProductManagerFile {
  constructor() {
    this.filename = './src/dao/filesystem/data/products.json';
    this.initializeFile();
  }

  async initializeFile() {
    try {
      await fs.access(this.filename);
    } catch (error) {
      await fs.writeFile(this.filename, '[]');
    }
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.filename, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Failed to fetch products:', error);
    }
  }

  async getProductById(pid) {
    try {
      const products = await this.getProducts();
      return products.find(product => product.id === pid);
    } catch (error) {
      throw new Error('Failed to fetch product by ID:', error);
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();

      if (products.some(p => p.code === product.code)) {
        throw new Error('Duplicate product code');
      }

      products.push({
        id: products.length + 1,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock
      });

      await this.saveProducts(products);
      return products[products.length - 1]; 
    } catch (error) {
      throw new Error('Error adding product:', error);
    }
  }

  async updateProduct(pid, updatedProduct) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex(product => product.id === pid);

      if (productIndex === -1) {
        throw new Error(`Product with ID ${pid} not found`);
      }

      const isDuplicate = products.some((p, index) => index !== productIndex && p.code === updatedProduct.code);
      if (isDuplicate) {
        throw new Error(`Product with code ${updatedProduct.code} already exists`);
      }

      products[productIndex] = {
        ...products[productIndex],
        ...updatedProduct
      };

      await this.saveProducts(products);
      return products[productIndex];
    } catch (error) {
      throw new Error('Error updating product:', error);
    }
  }

  async deleteProduct(pid) {
    try {
      let products = await this.getProducts();
      products = products.filter(product => product.id !== pid);
      await this.saveProducts(products);
    } catch (error) {
      throw new Error('Error deleting product:', error);
    }
  }

  async saveProducts(products) {
    try {
      await fs.writeFile(this.filename, JSON.stringify(products, null, 2), 'utf-8');
    } catch (error) {
      throw new Error('Failed to save products:', error);
    }
  }
}

module.exports = ProductManagerFile;
