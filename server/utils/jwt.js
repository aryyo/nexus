const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id,
            email: user.email,
            name: user.name
        },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
    JWT_SECRET
}; 