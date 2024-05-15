const { BaseError } = require('sequelize');
const errorHandler = require('../middlewares/errorHandler');

const mockRequest = () => {
    return {};
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

describe('Error Handler Middleware', () => {
    test('should return 500 for generic errors', () => {
        const err = new Error('Generic error');
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext;

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });

    test('should return 500 for Sequelize BaseError', () => {
        const err = new BaseError('Sequelize error');
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext;

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });

    test('should return 400 for SequelizeUniqueConstraintError', () => {
        const err = { name: 'SequelizeUniqueConstraintError' };
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext;

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unique constraint violation' });
    });

    test('should return 403 for ForbiddenError', () => {
        const err = { name: 'ForbiddenError' };
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext;

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden' });
    });

    test('should return 401 for User Login Error', () => {
        const err = { name: 'User Login Error', devMessage: 'Invalid credentials' };
        const req = mockRequest();
        const res = mockResponse();
        const next = mockNext;

        errorHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
});
