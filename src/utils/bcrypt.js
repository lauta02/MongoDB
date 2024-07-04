const bcrypt = require('bcrypt');

exports.createHash = (password) => {
    const saltRounds = 10;
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
}

exports.isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}