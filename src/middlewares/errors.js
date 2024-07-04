const CustomErrors = require('../utils/CustomErrors/Errors');
const { logger } = require('../config/logger');

function errorHandler(err, req, res, next) {
    logger.error("Error detected in the Error Handler");
    logger.error(err.cause);

    switch (err.code) {
        case CustomErrors.INVALID_TYPE_ERROR:
            res.status(400).json({ status: "error", message: err.message });
            break;
        default:
            res.status(500).json({ status: "error", message: "Unhandled error!" });
    }
}

module.exports = errorHandler;