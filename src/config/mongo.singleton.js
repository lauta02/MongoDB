const mongoose = require('mongoose');
const { logger } = require('./logger');

class MongoSingleton {
    static #instance;

    constructor() {
        this.#connectToMongoDB();
    }

    static getInstance() {
        if (this.#instance) {
            logger.info('Ya existe una conexión activa con MongoDB');
        } else {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    }

    #connectToMongoDB = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            logger.info('Conexión exitosa a MongoDB');
        } catch (error) {
            logger.error('Error al conectar con MongoDB: ' + error.message);
            process.exit(1); 
        }
    };
}

module.exports = MongoSingleton;