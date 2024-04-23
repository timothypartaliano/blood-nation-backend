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
        Reservation.findByPk(req.params.id)
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
        const { address, age, weight, bloodType } = req.body;

        if (!address || !age || !weight || !bloodType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        Reservation.create({
            address,
            age,
            weight,
            bloodType
        })
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                console.error(err);
                if (err.name === 'SequelizeUniqueConstraintError') {
                    res.status(400).json({ message: 'Reservation already exists' });
                } else {
                    res.status(500).json({ message: err.message });
                }
            })
    }

    static UpdateReservationByID(req, res) {
        const { address, age, weight, bloodType } = req.body;

        if (!address || !age || !weight || !bloodType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let reservationData = {
            address,
            age,
            weight,
            bloodType
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