const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().pattern(/^[0-9]+$/).required()
});

const eventSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    location: Joi.string().min(3).max(100).required(),
    quota: Joi.number().integer().min(1).required(),
    requirements: Joi.string().min(3).max(1000).required(),
    date: Joi.date().iso().required(),
    imageUrl: Joi.string().uri().optional()
});

const reservationSchema = Joi.object({
    address: Joi.string().min(3).max(255).required(),
    age: Joi.number().integer().min(0).required(),
    weight: Joi.number().min(0).required(),
    bloodType: Joi.string().valid('A', 'B', 'AB', 'O').required()
});

const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateEvent = (req, res, next) => {
    const { error } = eventSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

const validateReservation = (req, res, next) => {
    const { error } = reservationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = { validateRegister, validateEvent, validateReservation };
