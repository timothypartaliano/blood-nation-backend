const router = require('express').Router();
const EventController = require('../controllers/eventController');

router.get('/events', EventController.GetAllEvents);
router.get('/events/:id', EventController.GetEventByID);
router.post('/events', EventController.CreateEvent);
router.put('/events/:id', EventController.UpdateEventByID);
router.delete('/events/:id', EventController.DeleteEventbyID);

module.exports = router;