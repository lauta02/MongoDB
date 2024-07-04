const express = require('express');
const ProductRouter = require('./products.router');
const CartRouter = require('./carts.router');
const UserRouter = require('./users.router');
const ViewRouter = require('./views.router');
const MockingProductsUtil = require('../utils/mockingProducts');
const ErrorHandlerMiddleware = require('../middlewares/errors');
const Logger = require('../config/logger');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');

const productRouter = new ProductRouter();
const cartRouter = new CartRouter();
const userRouter = new UserRouter();
const viewRouter = new ViewRouter();

const mainRouter = express.Router();

mainRouter.use('/api/products', productRouter.getRoutes());

mainRouter.use('/api/carts', cartRouter.getRoutes());

mainRouter.use('/api/users', userRouter.getRoutes());

mainRouter.use('/', viewRouter.getRoutes());

mainRouter.get('/mockingproducts', (req, res) => {
    const mockedProducts = MockingProductsUtil.mockingProducts();
    res.send(mockedProducts);
});

mainRouter.get('/loggerTest', (req, res) => {
    Logger.log('info', 'Testing logger functionality');
    res.send('Logger test completed');
});

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'My eCommerce API Documentation',
            version: '1.0.0',
            description: 'API documentation for my eCommerce application',
        },
    },
    apis: ['./docs/**/*.yaml'],
};
const swaggerSpecs = swaggerJsdoc(swaggerOptions);
mainRouter.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpecs));

mainRouter.use('*', (req, res) => {
    res.status(404).json({ status: 'error', error: 'Not found' });
});

mainRouter.use(ErrorHandlerMiddleware);

module.exports = mainRouter;