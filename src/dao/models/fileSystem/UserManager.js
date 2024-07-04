const fs = require('fs').promises;
const CartManagerFile = require('./cart.file');
const cartManager = new CartManagerFile();

class UserManagerFile {
    constructor() {
        this.fileName = './src/dao/filesystem/data/users.json';
        this.initializeFile();
    }

    async initializeFile() {
        try {
            await fs.access(this.fileName);
        } catch (error) {
            await fs.writeFile(this.fileName, '[]');
        }
    }

    async getUsers() {
        try {
            const data = await fs.readFile(this.fileName, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error('Failed to fetch users:', error);
        }
    }

    async getUserById(uid) {
        try {
            const users = await this.getUsers();
            return users.find(user => user._id === uid);
        } catch (error) {
            throw new Error('Failed to fetch user by ID:', error);
        }
    }

    async getUserByEmail(email) {
        try {
            const users = await this.getUsers();
            return users.find(user => user.email === email);
        } catch (error) {
            throw new Error('Failed to fetch user by email:', error);
        }
    }

    async getUserByLogin(email, password) {
        try {
            const users = await this.getUsers();
            return users.find(user => user.email === email && user.password === password);
        } catch (error) {
            throw new Error('Failed to fetch user by login:', error);
        }
    }

    async getUserByCartId(cartId) {
        try {
            const users = await this.getUsers();
            return users.find(user => user.cart === cartId);
        } catch (error) {
            throw new Error('Failed to fetch user by cart ID:', error);
        }
    }

    async addUser(user) {
        try {
            const users = await this.getUsers();
            const userCart = await cartManager.createCart();
            user.cart = userCart;
            user._id = users.length + 1;
            users.push(user);
            await this.saveUsers(users);
            return users;
        } catch (error) {
            throw new Error('Failed to add user:', error);
        }
    }

    async updateUser(uid, updatedUser) {
        try {
            let users = await this.getUsers();
            const index = users.findIndex(user => user._id === uid);
            if (index !== -1) {
                users[index] = { ...users[index], ...updatedUser };
                await this.saveUsers(users);
            } else {
                throw new Error('User not found');
            }
            return users;
        } catch (error) {
            throw new Error('Failed to update user:', error);
        }
    }

    async deleteUser(uid) {
        try {
            let users = await this.getUsers();
            users = users.filter(user => user._id !== uid);
            await this.saveUsers(users);
            return users;
        } catch (error) {
            throw new Error('Failed to delete user:', error);
        }
    }

    async saveUsers(users) {
        try {
            await fs.writeFile(this.fileName, JSON.stringify(users, null, 2), 'utf8');
        } catch (error) {
            throw new Error('Failed to save users:', error);
        }
    }
}

module.exports = UserManagerFile;