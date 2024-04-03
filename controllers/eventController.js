const { Event } = require('../models');

class EventController {
    static GetAllEvents(req, res) {
        Event.findAll()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
                // res.status(500).json(err);
            })
    }

    static GetEventByID(req, res) {
        Event.findByPk(req.params.id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
                // res.status(500).json(err);
            })
    }
}

module.exports = EventController;