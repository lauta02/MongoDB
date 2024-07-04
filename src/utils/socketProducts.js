const ProductManager = require('../dao/mongo/product.mongo');
const productManager = new ProductManager();
const { logger } = require('../config/logger');

const socketProduct = (io) => {
    io.on('connection', async (socket) => {
        logger.info("New client connected in /realtimeproducts");

        const products = await productManager.getProducts();
        socket.emit('products', products);

        socket.on('addProduct', async (data) => {
            await productManager.addProduct(data);
            const updatedProducts = await productManager.getProducts();
            io.emit('products', updatedProducts);
        });

        socket.on('deleteProduct', async (data) => {
            await productManager.deleteProduct(data);
            const updatedProducts = await productManager.getProducts();
            io.emit('products', updatedProducts);
        });
    });
};

module.exports = socketProduct;