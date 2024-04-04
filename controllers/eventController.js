const { Event } = require('../models');

class EventController {
    static GetAllEvents(req, res) {
        Event.findAll()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            })
    }

    static GetEventByID(req, res) {
        Event.findByPk(req.params.id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            })
    }

    static CreateEvent(req, res) {
        const { name, location, quota, requirements, date, imageUrl } = req.body;

        if (!name || !location || !quota || !requirements || !date) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        Event.create({
            name,
            location,
            quota,
            requirements,
            date,
            imageUrl
        })
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            })
    }

    static UpdateEventByID(req, res) {
        const { name, location, quota, requirements, date, imageUrl } = req.body;

        if (!name || !location || !quota || !requirements || !date) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        let eventData = {
            name,
            location,
            quota,
            requirements,
            date,
            imageUrl
        }

        Event.update(eventData, {
            where: { id: req.params.id },
            returning: true
        })
            .then(result => {
                res.status(200).json({ message: "Event updated successfully", event: result });
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            })
    }

    static DeleteEventbyID(req, res) {
        Event.destroy({
            where: { id: req.params.id }
        })
            .then(result => {
                res.status(200).json({ message: "Event deleted successfully", result });
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            })
    }
}

module.exports = EventController;