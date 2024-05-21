const router = require('express').Router();
const ReservationController = require('../controllers/reservationController');
const EventController = require('../controllers/eventController');
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');
const { validateRegister, validateEvent, validateReservation } = require('../middlewares/validation');

router.post('/users/register', validateRegister, UserController.Register);
router.post('/users/login', UserController.Login);

router.use(authentication);

router.get('/users/:id', UserController.GetUserByID);

router.get('/events', EventController.GetAllEvents);
router.get('/events/:id', EventController.GetEventByID);
router.post('/events', validateEvent, EventController.CreateEvent);
router.put('/events/:id', validateEvent, EventController.UpdateEventByID);
router.delete('/events/:id', EventController.DeleteEventbyID);

router.get('/reservations', ReservationController.GetAllReservation);
router.get('/reservations/:id', ReservationController.GetReservationByID);
router.get('/reservations/user/:userId', ReservationController.GetReservationByUserID);
router.post('/reservations/:eventId/:userId', validateReservation, ReservationController.CreateReservation);
router.put('/reservations/:id', validateReservation, ReservationController.UpdateReservationByID);
router.delete('/reservations/:id', ReservationController.DeleteReservationbyID);

router.use(errorHandler);

module.exports = router;