const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_KEY, { expiresIn: '1d' });
};

const generateTokenResetPassword = (user) => {
    return jwt.sign({ user }, process.env.JWT_RESET_PASSWORD_KEY, { expiresIn: '1h' });
};

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "User not authenticated or missing token." });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if (error) return res.status(403).json({ error: "Token invalid, Unauthorized!" });
        req.user = decoded.user;
        next();
    });
};

const authTokenResetPassword = (req, res, next) => {
    const token = req.params.token;

    jwt.verify(token, process.env.JWT_RESET_PASSWORD_KEY, (error, decoded) => {
        if (error) return res.status(403).json({ error: "Token invalid, may have expired!" });
        req.user = decoded.user;
        next();
    });
};

const decodeJWT = (token, signature) => {
    const payload = jwt.verify(token, signature);
    return payload;
};

module.exports = { generateToken, authToken, generateTokenResetPassword, authTokenResetPassword, decodeJWT };