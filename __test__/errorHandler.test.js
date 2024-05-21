const { BaseError } = require('sequelize');
const errorHandler = require('../middlewares/errorHandler');

console.error = jest.fn();

describe('Error Handler Middleware', () => {
    let mockRequest, mockResponse, next;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    test('should handle generic errors', () => {
        const error = new Error('Something went wrong');
        errorHandler(error, mockRequest, mockResponse, next);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });

    test('should handle Sequelize base errors', () => {
        const error = new BaseError('Sequelize error');
        errorHandler(error, mockRequest, mockResponse, next);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });

    test('should handle SequelizeUniqueConstraintError', () => {
        const error = new Error('Unique constraint error');
        error.name = 'SequelizeUniqueConstraintError';
        errorHandler(error, mockRequest, mockResponse, next);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Unique constraint violation' });
    });

    test('should handle ForbiddenError', () => {
        const error = new Error('Access forbidden');
        error.name = 'ForbiddenError';
        errorHandler(error, mockRequest, mockResponse, next);
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Forbidden' });
    });

    test('should handle User Login Error', () => {
        const error = new Error('Invalid credentials');
        error.name = 'User Login Error';
        errorHandler(error, mockRequest, mockResponse, next);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
});
