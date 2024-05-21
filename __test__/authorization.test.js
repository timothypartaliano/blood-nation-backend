const { Event } = require('../models');
const uuidValidate = require('uuid-validate');
const authorization = require('../middlewares/authorization');

jest.mock('../models', () => ({
    Event: {
        findOne: jest.fn()
    }
}));

jest.mock('uuid-validate', () => jest.fn());

const mockRequest = (params) => ({
    params
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.locals = {};
    return res;
};

const mockNext = jest.fn();

describe('Authorization Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return 400 if event ID is invalid', async () => {
        uuidValidate.mockReturnValue(false);

        const req = mockRequest({ id: 'invalid-uuid' });
        const res = mockResponse();
        const next = mockNext;

        await authorization(req, res, next);

        expect(uuidValidate).toHaveBeenCalledWith('invalid-uuid');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            name: "Bad Request",
            message: "Invalid event ID provided"
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 404 if event is not found', async () => {
        uuidValidate.mockReturnValue(true);
        Event.findOne.mockResolvedValue(null);

        const req = mockRequest({ id: 'valid-uuid' });
        const res = mockResponse();
        const next = mockNext;

        await authorization(req, res, next);

        expect(uuidValidate).toHaveBeenCalledWith('valid-uuid');
        expect(Event.findOne).toHaveBeenCalledWith({
            where: { id: 'valid-uuid' }
        });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            name: "Data Not Found",
            message: `Event with id valid-uuid not found`
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 403 if user is not authorized', async () => {
        uuidValidate.mockReturnValue(true);
        Event.findOne.mockResolvedValue({ id: 'valid-uuid', UserId: 2 });

        const req = mockRequest({ id: 'valid-uuid' });
        const res = mockResponse();
        res.locals.user = { id: 1 };
        const next = mockNext;

        await authorization(req, res, next);

        expect(uuidValidate).toHaveBeenCalledWith('valid-uuid');
        expect(Event.findOne).toHaveBeenCalledWith({
            where: { id: 'valid-uuid' }
        });
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            name: "Authorization Error",
            message: `User with id 1 does not have permission to access Event with id valid-uuid`
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('should call next if user is authorized', async () => {
        uuidValidate.mockReturnValue(true);
        Event.findOne.mockResolvedValue({ id: 'valid-uuid', UserId: 1 });

        const req = mockRequest({ id: 'valid-uuid' });
        const res = mockResponse();
        res.locals.user = { id: 1 };
        const next = mockNext;

        await authorization(req, res, next);

        expect(uuidValidate).toHaveBeenCalledWith('valid-uuid');
        expect(Event.findOne).toHaveBeenCalledWith({
            where: { id: 'valid-uuid' }
        });
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    // test('should return 500 if Event.findOne throws an error', async () => {
    //     uuidValidate.mockReturnValue(true);
    //     const mockError = new Error('Database error');
    //     Event.findOne.mockRejectedValue(mockError);

    //     const req = mockRequest({ id: 'valid-uuid' });
    //     const res = mockResponse();
    //     res.locals.user = { id: 1 };
    //     const next = mockNext;

    //     await authorization(req, res, next);

    //     expect(uuidValidate).toHaveBeenCalledWith('valid-uuid');
    //     expect(Event.findOne).toHaveBeenCalledWith({
    //         where: { id: 'valid-uuid' }
    //     });
    //     expect(res.status).toHaveBeenCalledWith(500);
    //     expect(res.json).toHaveBeenCalledWith(mockError);
    //     expect(next).not.toHaveBeenCalled();
    // });
});
