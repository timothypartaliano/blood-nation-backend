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

        it('should fail with invalid registration data', () => {
            req.body = {
                username: 'tu',
                email: 'test@example',
                password: '123',
                phoneNumber: 'phone'
            };

            validateRegister(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Invalid registration data."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with username too short', () => {
            req.body = {
                username: 'tu',
                email: 'test@example.com',
                password: 'password123',
                phoneNumber: '1234567890'
            };
        
            validateRegister(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Username too short."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with invalid email format', () => {
            req.body = {
                username: 'testuser',
                email: 'invalidemail',
                password: 'password123',
                phoneNumber: '1234567890'
            };
        
            validateRegister(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Invalid email format."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with weak password (too short)', () => {
            req.body = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'weak',
                phoneNumber: '1234567890'
            };
        
            validateRegister(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Password too weak."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with invalid phone number format', () => {
            req.body = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                phoneNumber: 'invalid_phone_number'
            };
        
            validateRegister(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Invalid phone number format."
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

        it('should fail with invalid event data', () => {
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
                message: "Invalid event data."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with name too short', () => {
            req.body = {
                name: 'Ev',
                location: 'Sample Location',
                quota: 100,
                requirements: 'Some requirements',
                date: '2024-12-31T00:00:00.000Z',
                imageUrl: 'http://example.com/image.jpg'
            };
        
            validateEvent(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Event name too short."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with location too short', () => {
            req.body = {
                name: 'Sample Event',
                location: 'Loc',
                quota: 100,
                requirements: 'Some requirements',
                date: '2024-12-31T00:00:00.000Z',
                imageUrl: 'http://example.com/image.jpg'
            };
        
            validateEvent(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Event location too short."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with negative quota', () => {
            req.body = {
                name: 'Sample Event',
                location: 'Sample Location',
                quota: -1,
                requirements: 'Some requirements',
                date: '2024-12-31T00:00:00.000Z',
                imageUrl: 'http://example.com/image.jpg'
            };
        
            validateEvent(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Event quota cannot be negative."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with missing requirements', () => {
            req.body = {
                name: 'Sample Event',
                location: 'Sample Location',
                quota: 100,
                requirements: '',
                date: '2024-12-31T00:00:00.000Z',
                imageUrl: 'http://example.com/image.jpg'
            };
        
            validateEvent(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Event requirements are missing."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with invalid date format', () => {
            req.body = {
                name: 'Sample Event',
                location: 'Sample Location',
                quota: 100,
                requirements: 'Some requirements',
                date: 'invalid-date',
                imageUrl: 'http://example.com/image.jpg'
            };
        
            validateEvent(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Invalid event date format."
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

        it('should fail with invalid reservation data', () => {
            req.body = {
                address: '12',
                age: -1,
                weight: -10,
                bloodType: 'X'
            };

            validateReservation(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Invalid reservation data."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with empty address', () => {
            req.body = {
                address: '',
                age: 25,
                weight: 70,
                bloodType: 'A'
            };
        
            validateReservation(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Address is required."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with empty age', () => {
            req.body = {
                address: '123 Main St',
                age: '',
                weight: 70,
                bloodType: 'A'
            };
        
            validateReservation(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Age is required."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with empty weight', () => {
            req.body = {
                address: '123 Main St',
                age: 25,
                weight: '',
                bloodType: 'A'
            };
        
            validateReservation(req.body, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Weight is required."
            }));
            expect(next).not.toHaveBeenCalled();
        });

        it('should fail with empty blood type', () => {
            req.body = {
                address: '123 Main St',
                age: 25,
                weight: 70,
                bloodType: ''
            };
        
            validateReservation(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: "Blood type is required."
            }));
            expect(next).not.toHaveBeenCalled();
        });
    });
});
