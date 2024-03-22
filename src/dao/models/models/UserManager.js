const User = require('./User');

class UserManager {
    async authenticate(email, password) {
        const user = await User.findOne({ email });
        if (!user || !await user.matchPassword(password)) {
            throw new Error('Credenciales inválidas');
        }
        return user;
    }

    async register({ name, email, password }) {
        if (await User.findOne({ email })) {
            throw new Error('El correo electrónico ya está registrado');
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        return newUser;
    }
}

module.exports = UserManager;