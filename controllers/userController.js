const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static Register(req, res) {
        const { username, email, password, phoneNumber } = req.body
        User.create({
            username,
            email,
            password,
            phoneNumber
        })
            .then(result => {
                let response = {
                    id: result.id,
                    username: result.username,
                    email: result.email,
                    phoneNumber: result.phoneNumber
                }
                res.status(201).json(response)
            })
            .catch(err => {
                console.error(err);
                if (err.name === 'SequelizeUniqueConstraintError') {
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

                return res.status(200).json({ token })
            })
            .catch(err => {
                console.error(err);
                if (err.name === 'User Login Error') {
                    res.status(401).json({ message: err.devMessage });
                } else {
                    res.status(500).json({ message: err.message });
                }
            })
    }
}

module.exports = UserController;