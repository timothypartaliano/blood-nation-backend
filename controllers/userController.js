const { User } = require('../models');

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
}

module.exports = UserController;