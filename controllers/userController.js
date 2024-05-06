const { User, Sequelize } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { BaseError } = Sequelize;

class UserController {
    static GetUserByID(req, res) {
        User.findByPk(req.params.id)
            .then(result => {
                if (!result) {
                    return res.status(404).json({ message: 'User not found' });
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

    static Register(req, res) {
        const { username, email, password, phoneNumber } = req.body
        User.create({
            username,
            email,
            password,
            phone_number: phoneNumber
        })
            .then(result => {
                let response = {
                    id: result.id,
                    username: result.username,
                    email: result.email,
                    phone_number: result.phone_number
                }
                res.status(201).json(response)
            })
            .catch(err => {
                console.error('Internal Server Error occurred:', err);
                if (err instanceof BaseError) {
                    res.status(500).json({ message: 'Internal Server Error' });
                } else if (err.name === 'SequelizeUniqueConstraintError') {
                    res.status(400).json({ message: 'User already exists' });
                } else {
                    res.status(500).json({ message: err.message });
                }
            })
    }

    static Login(req, res) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (!user) {
                    throw {
                        name: "User Login Error",
                        devMessage: `User with email ${email} not found`
                    }
                }
                const isCorrect = comparePassword(password, user.password)
                if (!isCorrect) {
                    throw {
                        name: "User Login Error",
                        devMessage: `User's password with email ${email} does not match`
                    }
                }
                let payload = {
                    id: user.id,
                    email: user.email,
                }

                const token = generateToken(payload)

                return res.status(200).json({ 
                    token,
                    user_id: user.id,
                    username: user.username
                })
            })
            .catch(err => {
                console.error('Internal Server Error occurred:', err);
                if (err instanceof BaseError) {
                    res.status(500).json({ message: 'Internal Server Error' });
                } else if (err.name === 'User Login Error') {
                    res.status(401).json({ message: err.devMessage });
                } else {
                    res.status(500).json({ message: err.message });
                }
            })
    }
}

module.exports = UserController;