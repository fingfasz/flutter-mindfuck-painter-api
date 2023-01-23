const User = require('../models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { checkToken } = require('../utils/functions');

// register new user
const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if fields are filled
        if (!username || !password) {
            res.status(400).send({
                message: 'Missing data'
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
                message: 'Missing data'            
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
        const token = checkToken(req, res);
        const paramUUID = req.params.uuid;

        if (token.check) {
            const { uuid, username, created_at, updated_at } = token.value;

            if (uuid != paramUUID) {
                res.status(400).send({
                    message: 'Unauthorized'
                });
            } else {
                // send back user data
                res.status(200).send({
                    uuid, username, created_at, updated_at
                });
            }
        }
    } catch (err) {
        res.status(500).send({
            message: `Error: ${err}`
        });        
    }
}

module.exports = { createUser, loginUser, getUser };