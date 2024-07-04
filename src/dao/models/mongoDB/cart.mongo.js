const CartModel = require('./models/cart.model');

class CartManagerMongo {
    constructor(model) {
        this.cartModel = model;
    }

    async createCart() {
        try {
            return await CartModel.create({ products: [] });
        } catch (err) {
            throw new Error(err);
        }
    }

    async getCarts() {
        try {
            return await CartModel.find({});
        } catch (err) {
            throw new Error(err);
        }
    }

    async getCartById(cid) {
        try {
            return await CartModel.findOne({ _id: cid }).populate('products.product');
        } catch (err) {
            throw new Error(err);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await CartModel.findById(cid);
            const index = cart.products.findIndex(product => product.product.toString() === pid);

            if (index === -1) {
                const update = { $push: { products: { product: pid, quantity: 1 } } };
                await CartModel.updateOne({ _id: cid }, update);
            } else {
                const filter = { _id: cid, 'products.product': pid };
                const update = { $inc: { 'products.$.quantity': 1 } };
                await CartModel.updateOne(filter, update);
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteProductFromCart(cid, pid) {
        try {
            const filter = { _id: cid };
            const update = { $pull: { products: { product: pid } } };
            await CartModel.findOneAndUpdate(filter, update);
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateCart(cid, products) {
        try {
            const update = { $set: { products: products } };
            return await CartModel.findOneAndUpdate({ _id: cid }, update);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateQuantity(cid, pid, quantity) {
        try {
            const filter = { _id: cid, 'products.product': pid };
            const update = { $set: { 'products.$.quantity': quantity } };
            await CartModel.updateOne(filter, update);
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteAllProductsFromCart(cid) {
        try {
            const update = { $set: { products: [] } };
            await CartModel.updateOne({ _id: cid }, update);
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = CartManagerMongo;