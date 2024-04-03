const router = require('express').Router();
const EventController = require('../controllers/eventController');

router.get('/events', EventController.GetAllEvents);

module.exports = router;