const multer = require('multer');
const { logger } = require('../config/logger');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = '';
        switch (file.fieldname) {
            case 'profile':
                folder = 'profiles';
                break;
            case 'product':
                folder = 'products';
                break;
            case 'identification':
            case 'addressProof':
            case 'accountStatement':
                folder = 'documents';
                break;
            default:
                folder = 'uploads';
        }
        cb(null, `${__dirname}/../public/uploads/${folder}`);
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploader = multer({
    storage: storage,
    onError: function(err, next) {
        logger.error(err);
        next(err);
    }
});

module.exports = uploader;