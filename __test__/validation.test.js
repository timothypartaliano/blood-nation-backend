const { validateRegister, validateEvent, validateReservation } = require('../middlewares/validation');

describe('Validation Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    describe('Register Schema', () => {
        it('should pass with valid data', () => {
            req.body = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                phoneNumber: '1234567890'
            };

            validateRegister(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should fail with invalid data', () => {
            req.body = {
                username: 'tu',
                email: 'test@example',
                password: '123',
                phoneNumber: 'phone'
            };

            validateRegister(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.any(String)
            }));
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('Event Schema', () => {
        it('should pass with valid data', () => {
            req.body = {
                name: 'Sample Event',
                location: 'Sample Location',
                quota: 100,
                requirements: 'Some requirements',
                date: '2024-12-31T00:00:00.000Z',
                imageUrl: 'http://example.com/image.jpg'
            };

            validateEvent(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should fail with invalid data', () => {
            req.body = {
                name: 'Ev',
                location: 'Loc',
                quota: -1,
                requirements: 'Req',
                date: 'invalid-date'
            };

            validateEvent(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.any(String)
            }));
            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('Reservation Schema', () => {
        it('should pass with valid data', () => {
            req.body = {
                address: '123 Main St',
                age: 25,
                weight: 70,
                bloodType: 'A'
            };

            validateReservation(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });

        it('should fail with invalid data', () => {
            req.body = {
                address: '12',
                age: -1,
                weight: -10,
                bloodType: 'X'
            };

            validateReservation(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.any(String)
            }));
            expect(next).not.toHaveBeenCalled();
        });
    });
});
