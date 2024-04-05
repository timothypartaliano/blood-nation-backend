const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');

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
                res.status(500).json(err)
                console.log(err);
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
                let response = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phoneNumber
                }
                return res.status(200).json(response)
            })
            .catch(err => {
                res.status(401).json(err)
            })
    }
}

module.exports = UserController;