const { BaseError } = require('sequelize');

function errorHandler(err, req, res, next) {
    console.error('Internal Server Error occurred:', err);
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err instanceof BaseError) {
        statusCode = 500;
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 400;
        message = 'Unique constraint violation';
    } else if (err.name === 'ForbiddenError') {
        statusCode = 403;
        message = 'Forbidden';
    } else if (err.name === 'User Login Error') {
        statusCode = 401;
        message = err.devMessage;
    }

    res.status(statusCode).json({ message });
}

module.exports = errorHandler;