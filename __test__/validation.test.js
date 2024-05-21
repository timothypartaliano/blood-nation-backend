const { validateRegister, validateEvent, validateReservation } = require('../middlewares/validation');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

describe('Validation Middleware', () => {
    describe('validateRegister', () => {
        it('should pass valid data', () => {
            const req = { body: { username: 'john_doe', email: 'john@example.com', password: 'password123', phoneNumber: '1234567890' } };
            const res = mockResponse();
            validateRegister(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });

        it('should fail invalid data', () => {
            const req = { body: { username: 'jo', email: 'invalid-email', password: 'pass', phoneNumber: 'abc' } };
            const res = mockResponse();
            validateRegister(req, res, mockNext);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.any(String)
            }));
        });
    });

    describe('validateEvent', () => {
        it('should pass valid data', () => {
            const req = { body: { name: 'Event Name', location: 'Event Location', quota: 100, requirements: 'Some requirements', date: '2023-05-20T00:00:00.000Z' } };
            const res = mockResponse();
            validateEvent(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });

        it('should fail invalid data', () => {
            const req = { body: { name: 'Ev', location: 'Lo', quota: 0, requirements: 'Re', date: 'invalid-date' } };
            const res = mockResponse();
            validateEvent(req, res, mockNext);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.any(String)
            }));
        });
    });

    describe('validateReservation', () => {
        it('should pass valid data', () => {
            const req = { body: { address: '123 Main St', age: 25, weight: 70, bloodType: 'A' } };
            const res = mockResponse();
            validateReservation(req, res, mockNext);
            expect(mockNext).toHaveBeenCalled();
        });

        it('should fail invalid data', () => {
            const req = { body: { address: '12', age: -5, weight: -1, bloodType: 'X' } };
            const res = mockResponse();
            validateReservation(req, res, mockNext);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.any(String)
            }));
        });
    });
});
