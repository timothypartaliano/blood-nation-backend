const { Event, Sequelize } = require('../models');
const { BaseError } = Sequelize;

class EventController {
    static GetAllEvents(req, res) {
        const page = req.query.page || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        Event.findAll({ limit, offset })
            .then(result => {
                res.status(200).json(result); 
            })
            .catch(err => {
                console.error('Internal Server Error occurred:', err);
                if (err instanceof BaseError) {
                    res.status(500).json({ message: 'Internal Server Error' });
                } else {
                    res.status(500).json({ message: err.message });
                }
            })
    }

    static GetEventByID(req, res) {
        Event.findByPk(req.params.id)
            .then(result => {
                if (!result) {
                    return res.status(404).json({ message: 'Event not found' });
                }
                res.status(200).json(result);
            })
            .catch(err => {
                console.error('Internal Server Error occurred:', err);
                if (err instanceof BaseError) {
                    res.status(500).json({ message: 'Internal Server Error' });
                } else {
                    res.status(500).json({ message: err.message });
                }
            })
    }

    static CreateEvent(req, res) {
        const { name, location, quota, requirements, date, imageUrl } = req.body;

        if (!name || !location || !quota || !requirements || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        Event.create({
            name,
            location,
            quota,
            requirements,
            date,
            image_url: imageUrl
        })
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                console.error('Internal Server Error occurred:', err);
                if (err instanceof BaseError) {
                    res.status(500).json({ message: 'Internal Server Error' });
                } else if (err.name === 'SequelizeUniqueConstraintError') {
                    res.status(400).json({ message: 'Event already exists' });
                } else if (err.name === 'ForbiddenError') {
                    res.status(403).json({ message: 'Forbidden' });
                } else {
                    res.status(500).json({ message: err.message });
                }
            })
    }

    static UpdateEventByID(req, res) {
        const { name, location, quota, requirements, date, imageUrl } = req.body;

        if (!name || !location || !quota || !requirements || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let eventData = {
            name,
            location,
            quota,
            requirements,
            date,
            image_url: imageUrl
        }

        Event.update(eventData, {
            where: { id: req.params.id },
            returning: true
        })
            .then(result => {
                if (result[0] === 0) {
                    res.status(404).json({ message: 'Event not found' });
                } else {
                    res.status(200).json({ message: "Event updated successfully", event: result[1][0] });
                }
            })
            .catch(err => {
                console.error('Internal Server Error occurred:', err);
                if (err instanceof BaseError) {
                    res.status(500).json({ message: 'Internal Server Error' });
                } else if (err.name === 'ForbiddenError') {
                    res.status(403).json({ message: 'Forbidden' });
                } else {
                    res.status(500).json({ message: err.message });
                }
            })
    }

    static DeleteEventbyID(req, res) {
        Event.destroy({
            where: { id: req.params.id }
        })
            .then(result => {
                if (result === 0) {
                    res.status(404).json({ message: 'Event not found' });
                } else {
                    res.status(200).json({ message: "Event deleted successfully", result });
                }
            })
            .catch(err => {
                console.error('Internal Server Error occurred:', err);
                if (err instanceof BaseError) {
                    res.status(500).json({ message: 'Internal Server Error' });
                } else if (err.name === 'ForbiddenError') {
                    res.status(403).json({ message: 'Forbidden' });
                } else {
                    res.status(500).json({ message: err.message });
                }
            })
    }
}

module.exports = EventController;