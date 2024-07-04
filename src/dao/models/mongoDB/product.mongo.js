const ProductModel = require('./models/product.model');

class ProductManagerMongo {
    constructor(model) {
        this.productModel = model;
    }

    async getProducts(query, options) {
        try {
            return await ProductModel.paginate(query, options);
        } catch (err) {
            throw new Error(err);
        }
    }

    async getProductById(pid) {
        try {
            return await ProductModel.findOne({ _id: pid });
        } catch (err) {
            throw new Error(err);
        }
    }

    async addProduct(product) {
        try {
            return await ProductModel.create(product);
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateProduct(pid, updatedFields) {
        try {
            return await ProductModel.updateOne({ _id: pid }, updatedFields);
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteProduct(pid) {
        try {
            return await ProductModel.deleteOne({ _id: pid });
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = ProductManagerMongo;