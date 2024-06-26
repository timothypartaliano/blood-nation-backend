const { Event } = require("../models")
const { v4: uuidv4 } = require('uuid');
const uuidValidate = require('uuid-validate');

function authorization(req, res, next) {
    const eventId = req.params.id;
    const authenticatedUser = res.locals.user;

    if (!uuidValidate(eventId)) {
        return res.status(400).json({
            name: "Bad Request",
            message: "Invalid event ID provided"
        });
    }

    Event.findOne({
        where: {
            id: eventId
        }
    })
        .then(event => {
            if (!event) {
                return res.status(404).json({
                    name: "Data Not Found",
                    message: `Event with id ${eventId} not found`
                })
            }
            if (event.UserId === authenticatedUser.id) {
                return next();
            } else {
                return res.status(403).json({
                    name: "Authorization Error",
                    message: `User with id ${authenticatedUser.id} does not have permission to access Event with id ${eventId}`
                })
            }
        })
        .catch(err => {
            return res.status(500).json(err);
        });
}

module.exports = authorization