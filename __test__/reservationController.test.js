const ReservationController = require('../controllers/reservationController');
const { Reservation, User, Event } = require('../models');

jest.mock('../models', () => ({
  Reservation: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  User: {
    findOne: jest.fn(),
  },
  Event: {
    findByPk: jest.fn(),
  },
}));

describe('ReservationController', () => {
  describe('GetAllReservation', () => {
    it('should return all reservations', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const fakeReservations = [{ id: '1', address: 'Address 1' }, { id: '2', address: 'Address 2' }];

      Reservation.findAll.mockResolvedValue(fakeReservations);

      await ReservationController.GetAllReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeReservations);
    });
  });

  describe('GetReservationByID', () => {
    it('should return reservation if found', async () => {
      const req = { params: { id: 'existing-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const fakeReservation = { id: 'existing-id', address: 'Test Address' };

      Reservation.findByPk.mockResolvedValue(fakeReservation);

      await ReservationController.GetReservationByID(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeReservation);
    });

    it('should return 404 if reservation is not found', async () => {
      const req = { params: { id: 'non-existing-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Reservation.findByPk.mockResolvedValue(null);

      await ReservationController.GetReservationByID(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reservation not found' });
    });
  });

  describe('CreateReservation', () => {
    it('should create a new reservation', async () => {

    });

    it('should return 400 if any required field is missing', async () => {
      const req = { body: { address: 'New Address' }, params: { eventId: 'event-id' }, locals: { user: { id: 'user-id' } } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), locals: { user: { id: 'user-id' } } };

      await ReservationController.CreateReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });

    it('should return 404 if event is not found', async () => {
      const req = { body: { address: 'New Address', age: 25, weight: 70, bloodType: 'A+' }, params: { eventId: 'non-existing-event-id' }, locals: { user: { id: 'user-id' } } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), locals: { user: { id: 'user-id' } } };

      Event.findByPk.mockResolvedValue(null);

      await ReservationController.CreateReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
    });

    it('should return 400 if eventId is missing', async () => {
      const req = { body: { address: 'New Address', age: 25, weight: 70, bloodType: 'A+' }, params: {}, locals: { user: { id: 'user-id' } } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), locals: { user: { id: 'user-id' } } };

      await ReservationController.CreateReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });
  });

  describe('UpdateReservationByID', () => {
    it('should update an existing reservation', async () => {
      const req = { params: { id: 'existing-id' }, body: { address: 'Updated Address', age: 30, weight: 75, bloodType: 'B+' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const fakeReservation = { id: 'existing-id', ...req.body };
  
      Reservation.update.mockResolvedValue([1, [fakeReservation]]);
  
      await ReservationController.UpdateReservationByID(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reservation updated successfully', event: fakeReservation });
    });
  
    it('should return 400 if any required field is missing', async () => {
      const req = { params: { id: 'existing-id' }, body: { address: 'Updated Address' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await ReservationController.UpdateReservationByID(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });
  
    it('should return 404 if reservation is not found', async () => {
      const req = { params: { id: 'non-existing-id' }, body: { address: 'Updated Address', age: 30, weight: 75, bloodType: 'B+' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      Reservation.update.mockResolvedValue([0]);
  
      await ReservationController.UpdateReservationByID(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reservation not found' });
    });
  });  

  describe('DeleteReservationbyID', () => {
    it('should delete an existing reservation', async () => {
      const req = { params: { id: 'existing-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      Reservation.destroy.mockResolvedValue(1);
  
      await ReservationController.DeleteReservationbyID(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reservation deleted successfully', result: 1 });
    });
  
    it('should return 404 if reservation is not found', async () => {
      const req = { params: { id: 'non-existing-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      Reservation.destroy.mockResolvedValue(0);
  
      await ReservationController.DeleteReservationbyID(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Reservation not found' });
    });
  });  
});
