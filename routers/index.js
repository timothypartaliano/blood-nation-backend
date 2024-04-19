const router = require('express').Router();
const ReservationController = require('../controllers/ReservationController');
const EventController = require('../controllers/eventController');
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.post('/users/register', UserController.Register);
router.post('/users/login', UserController.Login);

router.use(authentication);

router.get('/events', EventController.GetAllEvents);
router.get('/events/:id', EventController.GetEventByID);
router.post('/events', EventController.CreateEvent);
router.put('/events/:id', EventController.UpdateEventByID);
router.delete('/events/:id', EventController.DeleteEventbyID);

router.get('/reservations', ReservationController.GetAllReservation);
router.get('/reservations/:id', ReservationController.GetReservationByID);
router.post('/reservations', ReservationController.CreateReservation);
router.put('/reservations/:id', ReservationController.UpdateReservationByID);
router.delete('/reservations/:id', ReservationController.DeleteReservationbyID);

module.exports = router;