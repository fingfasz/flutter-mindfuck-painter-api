const User = require('../models/user_model');

const createUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.create({ username, passowrd });
}

module.exports = createUser;