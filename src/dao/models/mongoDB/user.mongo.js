const UserModel = require('./models/user.model');

class UserManagerMongo {
    constructor(model) {
        this.userModel = model;
    }

    async getUsers() {
        try {
            return await UserModel.find({});
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserById(uid) {
        try {
            return await UserModel.findById(uid);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByEmail(email) {
        try {
            return await UserModel.findOne({ email: email });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByLogin(email, password) {
        try {
            return await UserModel.findOne({ email: email, password: password });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByCartId(cid) {
        try {
            return await UserModel.findOne({ cart: cid });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getInactiveUsers(option) {
        try {
            return await UserModel.find(option);
        } catch (error) {
            throw new Error(error);
        }
    }

    async addUser(user) {
        try {
            return await UserModel.create(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUser(uid, data) {
        try {
            return await UserModel.findOneAndUpdate({ _id: uid }, data);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUserDocuments(uid, documentName, documentPath) {
        try {
            const user = await UserModel.findById(uid);

            if (!user) throw new Error('User not found');

            const update = { $push: { documents: { name: documentName, reference: documentPath } } };
            await UserModel.updateOne({ _id: uid }, update);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteUser(uid) {
        try {
            return await UserModel.findOneAndDelete({ _id: uid });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = UserManagerMongo;