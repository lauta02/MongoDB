const mongoose = require('mongoose');

const USERS_COLLECTION = 'users';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },
    shoppingCart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    userRole: {
        type: String,
        enum: ['admin', 'user', 'premium'],
        default: 'user'
    },
    userDocuments: [{
        documentName: {
            type: String,
        },
        documentReference: {
            type: String,
        }
    }],
    lastConnection: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model(USERS_COLLECTION, UserSchema);

module.exports = UserModel;