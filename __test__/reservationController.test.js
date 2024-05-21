const ReservationController = require('../controllers/reservationController');
const { Reservation, User, Event } = require('../models');

jest.mock('../models');

describe('ReservationController', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('GetAllReservation', () => {
        it('should return all reservations', async () => {
            const reservations = [{ id: 1, address: 'Test Address' }];
            Reservation.findAll.mockResolvedValue(reservations);

            await ReservationController.GetAllReservation(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(reservations);
            expect(Reservation.findAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('GetReservationByID', () => {
        it('should return a reservation by ID', async () => {
            const reservation = { id: 1, address: 'Test Address' };
            req.params = { id: 1 };
            Reservation.findByPk.mockResolvedValue(reservation);

            await ReservationController.GetReservationByID(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(reservation);
            expect(Reservation.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
        });

        it('should return 404 if reservation not found', async () => {
            req.params = { id: 1 };
            Reservation.findByPk.mockResolvedValue(null);

            await ReservationController.GetReservationByID(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Reservation not found' });
        });
    });

    describe('CreateReservation', () => {
        it('should create a new reservation', async () => {
            const event = { id: 1, name: 'Test Event' };
            const newReservation = { id: 1, address: 'Test Address', age: 30, weight: 70, blood_type: 'A', user_id: 1, event_id: 1 };
            req.params = { eventId: 1, userId: 1 };
            req.body = { address: 'Test Address', age: 30, weight: 70, bloodType: 'A' };
            Event.findByPk.mockResolvedValue(event);
            Reservation.create.mockResolvedValue(newReservation);

            await ReservationController.CreateReservation(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Reservation created successfully', reservation: newReservation, eventId: 1 });
            expect(Event.findByPk).toHaveBeenCalledWith(1);
            expect(Reservation.create).toHaveBeenCalledWith({
                address: 'Test Address',
                age: 30,
                weight: 70,
                blood_type: 'A',
                user_id: 1,
                event_id: 1
            });
        });

        it('should return 404 if event not found', async () => {
            req.params = { eventId: 1, userId: 1 };
            req.body = { address: 'Test Address', age: 30, weight: 70, bloodType: 'A' };
            Event.findByPk.mockResolvedValue(null);

            await ReservationController.CreateReservation(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
        });
    });

    describe('UpdateReservationByID', () => {
        it('should update a reservation by ID', async () => {
            req.params = { id: 1 };
            req.body = { address: 'Updated Address', age: 31, weight: 71, bloodType: 'B' };
            const updatedReservation = [{ id: 1, address: 'Updated Address', age: 31, weight: 71, blood_type: 'B' }];
            Reservation.update.mockResolvedValue([1, updatedReservation]);

            await ReservationController.UpdateReservationByID(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Reservation updated successfully', event: updatedReservation[0] });
            expect(Reservation.update).toHaveBeenCalledWith(
                { address: 'Updated Address', age: 31, weight: 71, blood_type: 'B' },
                { where: { id: 1 }, returning: true }
            );
        });

        it('should return 404 if reservation not found', async () => {
            req.params = { id: 1 };
            req.body = { address: 'Updated Address', age: 31, weight: 71, bloodType: 'B' };
            Reservation.update.mockResolvedValue([0, []]);

            await ReservationController.UpdateReservationByID(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Reservation not found' });
        });
    });

    describe('DeleteReservationByID', () => {
        it('should delete a reservation by ID', async () => {
            req.params = { id: 1 };
            Reservation.destroy.mockResolvedValue(1);

            await ReservationController.DeleteReservationbyID(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Reservation deleted successfully', result: 1 });
            expect(Reservation.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
        });

        it('should return 404 if reservation not found', async () => {
            req.params = { id: 1 };
            Reservation.destroy.mockResolvedValue(0);

            await ReservationController.DeleteReservationbyID(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Reservation not found' });
        });
    });
});
