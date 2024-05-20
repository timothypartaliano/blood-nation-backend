const EventController = require('../controllers/eventController');
const { Event } = require('../models');

jest.mock('../models', () => ({
  Event: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  }
}));

describe('EventController', () => {
  describe('GetAllEvents', () => {
    it('should return all events', async () => {
      const req = { query: { page: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const fakeEvents = [{ id: '1', name: 'Event 1' }, { id: '2', name: 'Event 2' }];

      Event.findAll.mockResolvedValue(fakeEvents);

      await EventController.GetAllEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeEvents);
    });
  });

  describe('GetEventByID', () => {
    it('should return event if found', async () => {
      const req = { params: { id: 'existing-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const fakeEvent = { id: 'existing-id', name: 'Test Event' };

      Event.findByPk.mockResolvedValue(fakeEvent);

      await EventController.GetEventByID(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeEvent);
    });

    it('should return 404 if event is not found', async () => {
      const req = { params: { id: 'non-existing-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Event.findByPk.mockResolvedValue(null);

      await EventController.GetEventByID(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
    });
  });

  describe('CreateEvent', () => {
    it('should create a new event', async () => {
      const req = { body: { name: 'New Event', location: 'Location', quota: 100, requirements: 'Requirements', date: '2024-05-13', imageUrl: 'image.jpg' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const fakeEvent = { id: 'newly-generated-id', ...req.body };

      Event.create.mockResolvedValue(fakeEvent);

      await EventController.CreateEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(fakeEvent);
    });

    it('should return 400 if any required field is missing', async () => {
      const req = { body: { name: 'New Event' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await EventController.CreateEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });
  });

  describe('UpdateEventByID', () => {
    it('should update an existing event', async () => {
      const req = { params: { id: 'existing-id' }, body: { name: 'Updated Event', location: 'Updated Location', quota: 200, requirements: 'Updated Requirements', date: '2024-05-14', imageUrl: 'updated-image.jpg' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const fakeEvent = { id: 'existing-id', ...req.body };
  
      Event.update.mockResolvedValue([1, [fakeEvent]]);
  
      await EventController.UpdateEventByID(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event updated successfully', event: fakeEvent });
    });
  
    it('should return 400 if any required field is missing', async () => {
      const req = { params: { id: 'existing-id' }, body: { name: 'Updated Event' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await EventController.UpdateEventByID(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });
  
    it('should return 404 if event is not found', async () => {
      const req = { params: { id: 'non-existing-id' }, body: { name: 'Updated Event', location: 'Updated Location', quota: 200, requirements: 'Updated Requirements', date: '2024-05-14', imageUrl: 'updated-image.jpg' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      Event.update.mockResolvedValue([0]);
  
      await EventController.UpdateEventByID(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
    });
  });
  
  describe('DeleteEventbyID', () => {
    it('should delete an existing event', async () => {
      const req = { params: { id: 'existing-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      Event.destroy.mockResolvedValue(1);
  
      await EventController.DeleteEventbyID(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event deleted successfully', result: 1 });
    });
  
    it('should return 404 if event is not found', async () => {
      const req = { params: { id: 'non-existing-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      Event.destroy.mockResolvedValue(0);
  
      await EventController.DeleteEventbyID(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
    });
  });  
});
