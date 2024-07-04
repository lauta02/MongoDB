const { UserDao, ProductDao, CartDao, TicketDao } = require('../dao/factory');
const UserRepository = require('../repositories/user.repository');
const ProductRepository = require('../repositories/product.repository');
const CartRepository = require('../repositories/cart.repository');
const TicketRepository = require('../repositories/ticket.repository');

const userRepositoryInstance = new UserRepository(new UserDao());
const productRepositoryInstance = new ProductRepository(new ProductDao());
const cartRepositoryInstance = new CartRepository(new CartDao());
const ticketRepositoryInstance = new TicketRepository(new TicketDao());

module.exports = { userRepositoryInstance, productRepositoryInstance, cartRepositoryInstance, ticketRepositoryInstance };