const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');
const authentication = require('../middlewares/authentication');

jest.mock('../models', () => ({
    User: {
        findOne: jest.fn()
    }
}));

jest.mock('../helpers/jwt', () => ({
    verifyToken: jest.fn()
}));

const mockRequest = (headers) => ({
    get: (name) => headers[name]
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.locals = {};
    return res;
};

const mockNext = jest.fn();

describe('Authentication Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call next if user is authenticated', async () => {
        const userDecoded = { id: 1, email: 'test@example.com' };
        verifyToken.mockReturnValue(userDecoded);
        User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });

        const req = mockRequest({ token: 'valid_token' });
        const res = mockResponse();
        const next = mockNext;

        await authentication(req, res, next);

        expect(verifyToken).toHaveBeenCalledWith('valid_token');
        expect(User.findOne).toHaveBeenCalledWith({
            where: { id: userDecoded.id, email: userDecoded.email }
        });
        expect(res.locals.user).toEqual({ id: 1, email: 'test@example.com' });
        expect(next).toHaveBeenCalled();
    });

    test('should return 401 if user is not found', async () => {
        const userDecoded = { id: 1, email: 'test@example.com' };
        verifyToken.mockReturnValue(userDecoded);
        User.findOne.mockResolvedValue(null);

        const req = mockRequest({ token: 'valid_token' });
        const res = mockResponse();
        const next = mockNext;

        await authentication(req, res, next);

        expect(verifyToken).toHaveBeenCalledWith('valid_token');
        expect(User.findOne).toHaveBeenCalledWith({
            where: { id: userDecoded.id, email: userDecoded.email }
        });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            name: "Authentication Error",
            devMessage: `User with id ${userDecoded.id} not found in Database`
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 if token is invalid', async () => {
        verifyToken.mockImplementation(() => { throw new Error('Invalid token') });

        const req = mockRequest({ token: 'invalid_token' });
        const res = mockResponse();
        const next = mockNext;

        await authentication(req, res, next);

        expect(verifyToken).toHaveBeenCalledWith('invalid_token');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.any(Error));
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 if User.findOne throws an error', async () => {
        const userDecoded = { id: 1, email: 'test@example.com' };
        verifyToken.mockReturnValue(userDecoded);
        User.findOne.mockRejectedValue(new Error('Database error'));

        const req = mockRequest({ token: 'valid_token' });
        const res = mockResponse();
        const next = mockNext;

        await authentication(req, res, next);

        expect(verifyToken).toHaveBeenCalledWith('valid_token');
        expect(User.findOne).toHaveBeenCalledWith({
            where: { id: userDecoded.id, email: userDecoded.email }
        });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.any(Error));
        expect(next).not.toHaveBeenCalled();
    });
});
