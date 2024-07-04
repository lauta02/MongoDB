const userModel = require('../dao/mongo/models/user.model');

const updateLastConnection = async (userId) => {
    try {
        const user = await userModel.findByIdAndUpdate(userId, { last_connection: new Date() }, { new: true });
        return user;
    } catch (error) {
        console.error('Error updating last connection:', error);
        throw error;
    }
};

module.exports = updateLastConnection;