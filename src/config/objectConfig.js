const { MongoSingleton } = require('./mongo.singleton');
const program = require('../utils/commander');
const dotenv = require('dotenv');
const { logger } = require('./logger');

const { mode } = program.opts();

dotenv.config({ path: './.env' });
dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
});

const initMongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        logger.error('Error al inicializar instancia de MongoDB:', error);
    }
};

module.exports = { initMongoInstance, environment: mode };