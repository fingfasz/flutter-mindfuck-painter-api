const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register new user
const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if fields are filled
        if (!username || !password) {
            res.status(400).send({
                message: 'Missing fields'
            });
        } else {
            const exists = await User.findOne({
                where: {
                    username: username
                }
            });
        
            // check wether user already exists
            if (exists) {
                res.status(400).send({
                    message: 'Username already exists'
                });
            } else {
                const salt = await bcrypt.genSalt(13);
                const hash = await bcrypt.hash(password, salt);
        
                const user = await User.create({ username, password: hash });
                const newUser = await User.findOne({
                    where: {
                        uuid: user.uuid
                    },
                    attributes: ['username', 'created_at', 'updated_at']
                });
                
                res.status(201).send({
                    message: 'User created',
                    user: newUser
                });
            }
        }
    } catch (err) {
        res.status(500).send({
            message: `Error: ${err}`
        });
    }
}

// user login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if fields are filled
        if (!username || !password) {
            res.status(400).send({
                message: 'Missing fields'            
            });
        } else {
            // check if username is valid
            const user = await User.findOne({
                where: {
                    username: username
                }
            });

            // check username and password
            const compare = await bcrypt.compare(password, user.password);
            if (!user || !compare){
                res.status(401).send({
                    message: 'Incorrect credentials'            
                });
            } else {
                // JWT
                const token = jwt.sign({ uuid: user.uuid, username: user.username, created_at: user.created_at, updated_at: user.updated_at }, process.env.JWT_SECRET);

                res.status(200).send({
                    message: 'Successfully logged in',
                    token
                });
            }
        }
    } catch (err) {
        res.status(500).send({
            message: `Error: ${err}`
        });
    }
}

// get user
const getUser = async (req, res) => {
    try {
        // check token
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            res.status(400).send({
                message: 'No bearer token'
            });
        } else {
            const { uuid, username, created_at, updated_at } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);

            // send back userdata
            res.status(200).send({
                uuid, username, created_at, updated_at
            });
        }

    } catch (err) {
        // invalid json token
        if (err.name == 'JsonWebTokenError') {
            res.status(401).send({
                message: `Not authorized`
            });
        } else {
            res.status(500).send({
                message: `Error: ${err}`
            });
        }
    }
}

module.exports = { createUser, loginUser, getUser };