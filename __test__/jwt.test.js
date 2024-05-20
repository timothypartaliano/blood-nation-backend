require('dotenv').config();
const jwt = require('jsonwebtoken');
const { generateToken, verifyToken } = require('../helpers/jwt');

describe('JWT Token Generation and Verification', () => {
    const payload = { userId: 123 };
    let token;

    beforeAll(() => {
        process.env.JWT_SECRET_KEY = 'testsecretkey';
        process.env.JWT_TOKEN_EXP = '1h';

        token = generateToken(payload);
    });

    test('generateToken should generate a valid JWT token', () => {
        expect(token).toBeDefined();
        expect(token).not.toBeNull();
        expect(typeof token).toBe('string');
    });

    test('verifyToken should decode the token correctly', () => {
        const decoded = verifyToken(token);
        expect(decoded).toBeDefined();
        expect(decoded).not.toBeNull();
        expect(decoded.userId).toBe(payload.userId);
    });

    test('verifyToken should throw an error for an invalid token', () => {
        const invalidToken = 'invalid.token.here';
        expect(() => verifyToken(invalidToken)).toThrow(jwt.JsonWebTokenError);
    });
});
