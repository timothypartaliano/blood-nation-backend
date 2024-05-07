const { Reservation, User, Event, Sequelize } = require('../models');

class ReservationController {
    static GetAllReservation(req, res, next) {
        Reservation.findAll({
            include: [{ model: User, as: 'user' }, { model: Event, as: 'event' }]
        })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                next(err);
            });
    }

    static GetReservationByID(req, res, next) {
        Reservation.findByPk(req.params.id, {
            include: [{ model: User, as: 'user' }, { model: Event, as: 'event' }]
        })
            .then(result => {
                if (!result) {
                    return res.status(404).json({ message: 'Reservation not found' });
                }
                res.status(200).json(result);
            })
            .catch(err => {
                next(err);
            });
    }

    static GetReservationByUserID(req, res, next) {
        const userId = req.params.userId;

        Reservation.findAll({
            where: { user_id: userId },
            include: [{ model: User, as: 'user' }, { model: Event, as: 'event' }]
        })
            .then(result => {
                if (result.length === 0) {
                    return res.status(404).json({ message: 'Reservations not found for this user' });
                }
                res.status(200).json(result);
            })
            .catch(err => {
                next(err);
            });
    }

    static CreateReservation(req, res, next) {
        const { address, age, weight, bloodType } = req.body;
        const eventId = req.params.eventId;
        const user = res.locals.user;

        if (!address || !age || !weight || !bloodType || !eventId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        Event.findByPk(eventId)
            .then(event => {
                if (!event) {
                    return res.status(404).json({ message: 'Event not found' });
                }

                Reservation.create({
                    address,
                    age,
                    weight,
                    blood_type: bloodType,
                    user_id: user.id,
                    event_id: eventId
                })
                    .then(result => {
                        res.status(201).json({ message: 'Reservation created successfully', reservation: result, eventId: eventId });
                    })
                    .catch(err => {
                        console.error("An error occurred while processing the request.");
                        if (err.name === 'SequelizeUniqueConstraintError') {
                            res.status(400).json({ message: 'Reservation already exists' });
                        } else {
                            res.status(500).json({ message: 'Internal Server Error' });
                        }
                    });
            })
            .catch(err => {
                next(err);
            });
    }

    static UpdateReservationByID(req, res, next) {
        const { address, age, weight, bloodType } = req.body;

        if (!address || !age || !weight || !bloodType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let reservationData = {
            address,
            age,
            weight,
            blood_type: bloodType
        }

        Reservation.update(reservationData, {
            where: { id: req.params.id },
            returning: true
        })
            .then(result => {
                if (result[0] === 0) {
                    res.status(404).json({ message: 'Reservation not found' });
                } else {
                    res.status(200).json({ message: "Reservation updated successfully", event: result[1][0] });
                }
            })
            .catch(err => {
                next(err);
            });
    }

    static DeleteReservationbyID(req, res) {
        Reservation.destroy({
            where: { id: req.params.id }
        })
            .then(result => {
                if (result === 0) {
                    res.status(404).json({ message: 'Reservation not found' });
                } else {
                    res.status(200).json({ message: "Reservation deleted successfully", result });
                }
            })
            .catch(err => {
                next(err);
            });
    }
}

module.exports = ReservationController;