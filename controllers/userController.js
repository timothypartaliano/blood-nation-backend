const { User, Sequelize } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static GetUserByID(req, res, next) {
        User.findByPk(req.params.id)
            .then(result => {
                if (!result) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(result);
            })
            .catch(err => {
                next(err);
            });
    }

    static Register(req, res, next) {
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
                next(err);
            });
    }

    static Login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: `User with email ${email} not found` });
                }
                const isCorrect = comparePassword(password, user.password)
                if (!isCorrect) {
                    return res.status(401).json({ message: `User's password with email ${email} does not match` });
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
                next(err);
            });
    }
}

module.exports = UserController;