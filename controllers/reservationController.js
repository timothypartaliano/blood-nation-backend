const { Reservation } = require('../models');

class ReservationController {
    static GetAllReservation(req, res) {
        Reservation.findAll()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: err.message });
            })
    }
}

module.exports = ReservationController;