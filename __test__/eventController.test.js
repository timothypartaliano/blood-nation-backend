const EventController = require('../controllers/eventController');
const { Event } = require('../models');

jest.mock('../models');

describe('EventController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('GetAllEvents', () => {
        it('should return all events with status 200', async () => {
            const events = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
            Event.findAll.mockResolvedValue(events);

            await EventController.GetAllEvents(req, res, next);

            expect(Event.findAll).toHaveBeenCalledWith({ limit: 10, offset: 0 });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(events);
        });
    });

    describe('GetEventByID', () => {
        it('should return an event by ID with status 200', async () => {
            const event = { id: 1, name: 'Event 1' };
            req.params.id = 1;
            Event.findByPk.mockResolvedValue(event);

            await EventController.GetEventByID(req, res, next);

            expect(Event.findByPk).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(event);
        });

        it('should return 404 if event is not found', async () => {
            req.params.id = 1;
            Event.findByPk.mockResolvedValue(null);

            await EventController.GetEventByID(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
        });
    });

    describe('CreateEvent', () => {
        it('should create an event and return it with status 201', async () => {
            const event = { id: 1, name: 'Event 1' };
            req.body = {
                name: 'Event 1',
                location: 'Location 1',
                quota: 100,
                requirements: 'None',
                date: '2023-01-01',
                imageUrl: 'http://example.com/image.jpg'
            };
            Event.create.mockResolvedValue(event);

            await EventController.CreateEvent(req, res, next);

            expect(Event.create).toHaveBeenCalledWith({
                name: 'Event 1',
                location: 'Location 1',
                quota: 100,
                requirements: 'None',
                date: '2023-01-01',
                image_url: 'http://example.com/image.jpg'
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(event);
        });
    });

    describe('UpdateEventByID', () => {
        it('should update an event and return it with status 200', async () => {
            const event = { id: 1, name: 'Updated Event' };
            req.params.id = 1;
            req.body = {
                name: 'Updated Event',
                location: 'New Location',
                quota: 200,
                requirements: 'New Requirements',
                date: '2023-02-01',
                imageUrl: 'http://example.com/newimage.jpg'
            };
            Event.update.mockResolvedValue([1, [event]]);

            await EventController.UpdateEventByID(req, res, next);

            expect(Event.update).toHaveBeenCalledWith({
                name: 'Updated Event',
                location: 'New Location',
                quota: 200,
                requirements: 'New Requirements',
                date: '2023-02-01',
                image_url: 'http://example.com/newimage.jpg'
            }, {
                where: { id: 1 },
                returning: true
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Event updated successfully", event });
        });

        it('should return 404 if event is not found', async () => {
            req.params.id = 1;
            req.body = {
                name: 'Updated Event',
                location: 'New Location',
                quota: 200,
                requirements: 'New Requirements',
                date: '2023-02-01',
                imageUrl: 'http://example.com/newimage.jpg'
            };
            Event.update.mockResolvedValue([0]);

            await EventController.UpdateEventByID(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
        });
    });

    describe('DeleteEventbyID', () => {
        it('should delete an event and return status 200', async () => {
            req.params.id = 1;
            Event.destroy.mockResolvedValue(1);

            await EventController.DeleteEventbyID(req, res, next);

            expect(Event.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Event deleted successfully", result: 1 });
        });

        it('should return 404 if event is not found', async () => {
            req.params.id = 1;
            Event.destroy.mockResolvedValue(0);

            await EventController.DeleteEventbyID(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Event not found' });
        });
    });
});
