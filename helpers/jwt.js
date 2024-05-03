const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const TOKEN_EXP = process.env.JWT_TOKEN_EXP;

function generateToken(payload) {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXP });
    return token;
}

function verifyToken(token) {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
}

module.exports = {
    generateToken,
    verifyToken
}