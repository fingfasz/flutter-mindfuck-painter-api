const User = require('../models/user_model');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send({
            error: 'Missing fields'
        });
    }

    const exists = await User.findOne({
        where: {
            username: username
        }
    });

    if (exists) {
        res.status(400).send({
            error: 'Username already exists'
        });
    } else {
        const salt = await bcrypt.genSalt(13);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ username, password: hash });
        res.status(201).send({
            user: user
        });
    }
}

module.exports = createUser;