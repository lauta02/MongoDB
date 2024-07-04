const config = require('../config/objectConfig');

let UserDAO, ProductDAO, CartDAO, TicketDAO;

switch (process.env.PERSISTENCE) {
    case 'MONGO':
        config.mongoInstance();
        const UserDAOMongo = require('../dao/mongo/user.mongo');
        const ProductDAOMongo = require('../dao/mongo/product.mongo');
        const CartDAOMongo = require('../dao/mongo/cart.mongo');
        const TicketDAOMongo = require('../dao/mongo/ticket.mongo');

        UserDAO = UserDAOMongo;
        ProductDAO = ProductDAOMongo;
        CartDAO = CartDAOMongo;
        TicketDAO = TicketDAOMongo;
        break;
    
    case 'FILE':
        const UserDAOFile = require('../dao/filesystem/user.file');
        const ProductDAOFile = require('../dao/filesystem/product.file');
        const CartDAOFile = require('../dao/filesystem/cart.file');

        UserDAO = UserDAOFile;
        ProductDAO = ProductDAOFile;
        CartDAO = CartDAOFile;
        break;

    default:
        throw new Error('Invalid persistence method');
}

module.exports = { UserDAO, ProductDAO, CartDAO, TicketDAO };