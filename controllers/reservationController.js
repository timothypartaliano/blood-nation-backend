const { Reservation, User, Event } = require('../models');

class ReservationController {
    static GetAllReservation(req, res) {
        Reservation.findAll({
            include: [User, Event]
        })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: err.message });
            })
    }

    static GetReservationByID(req, res) {
        Reservation.findByPk(req.params.id, {
            include: [User, Event]
        })
            .then(result => {
                if (!result) {
                    return res.status(404).json({ message: 'Reservation not found' });
                }
                res.status(200).json(result);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: err.message });
            })
    }

    static CreateReservation(req, res) {
        const { address, age, weight, blood_type } = req.body;
        const eventId = req.params.eventId;
        const user = res.locals.user;

        if (!address || !age || !weight || !blood_type || !eventId) {
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
                blood_type,
                user_id: user.id,
                event_id: eventId
            })
                .then(result => {
                    res.status(201).json({ message: 'Reservation created successfully', reservation: result, eventId: eventId });
                })
                .catch(err => {
                    console.error(err);
                    if (err.name === 'SequelizeUniqueConstraintError') {
                        res.status(400).json({ message: 'Reservation already exists' });
                    } else {
                        res.status(500).json({ message: err.message });
                    }
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: err.message });
        });
    }

    static UpdateReservationByID(req, res) {
        const { address, age, weight, blood_type } = req.body;

        if (!address || !age || !weight || !blood_type) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let reservationData = {
            address,
            age,
            weight,
            blood_type
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
                console.error(err);
                res.status(500).json({ message: err.message });
            })
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
                console.error(err);
                res.status(500).json({ message: err.message });
            })
    }
}

module.exports = ReservationController;