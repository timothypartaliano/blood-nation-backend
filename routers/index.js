const router = require('express').Router();
const EventController = require('../controllers/eventController');

router.get('/events', EventController.GetAllEvents);
router.get('/events/:id', EventController.GetEventByID);

module.exports = router;