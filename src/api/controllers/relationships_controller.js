const Relationship = require('../models/relationship_model');
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

// const addFriend = async (req, res) => {
//     const { otherUUID, blocked } = req.body;

//     try {
//         if (checkToken(req, res)) {
//             console.log(jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET))
//             const { uuid } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);

//             // check other uuid
//             const userExists = await User.findOne({
//                 where: {
//                     uuid: otherUUID
//                 }
//             });
        
//             // check wether user already exists
//             if (!userExists) {
//                 res.status(400).send({
//                     message: 'Invalid UUID'
//                 });
//             } else {
//                 // check wether relationship already exists
//                 // todo: if already blocked, then unblock or send back error message
//                 const relshipExists = await Relationship.findOne({
//                     where: {
//                         [Op.and]: {
//                             user_uuid: uuid,
//                             other_uuid: otherUUID
//                         }
//                     }
//                 });
            
//                 if (relshipExists) {
//                     res.status(400).send({
//                         message: 'Relationship already exists'
//                     });
//                 } else {
//                     // create relationship
//                     const relationship = await Relationship.create(
//                         {
//                             user_uuid: uuid,
//                             other_uuid: otherUUID,
//                             blocked
//                         }
//                     );
                        
//                     // send back relationship data
//                     res.status(201).send({ message: 'Relationship created', relationship });
//                 }
//             }
//         }

//     } catch (err) {
//         // invalid json token
//         if (err.name == 'JsonWebTokenError') {
//             console.log(jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET))
//             res.status(401).send({
//                 message: `Not authorized`
//             });
//         } else {
//             res.status(500).send({
//                 message: `Error: ${err}`
//             });
//         }

//         // jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        
//         // res.status(500).send({
//         //     message: `Error: ${err}`
//         // });
//     }
// }

const addFriend = async (req, res) => {
    const { otherUUID, blocked } = req.body;

    try {
        const token = checkToken(req, res);

        if (token.check == true) {            
            const { uuid } = token.value;

            // check other uuid
            const userExists = await User.findOne({
                where: {
                    uuid: otherUUID
                }
            });
        
            // check wether user already exists
            if (!userExists) {
                res.status(400).send({
                    message: 'Invalid UUID'
                });
            } else {
                // check wether relationship already exists
                // todo: if already blocked, then unblock or send back error message
                const relshipExists = await Relationship.findOne({
                    where: {
                        [Op.and]: {
                            user_uuid: uuid,
                            other_uuid: otherUUID
                        }
                    }
                });
            
                if (relshipExists) {
                    res.status(400).send({
                        message: 'Relationship already exists'
                    });
                } else {
                    // create relationship
                    const relationship = await Relationship.create(
                        {
                            user_uuid: uuid,
                            other_uuid: otherUUID,
                            blocked
                        }
                    );
                        
                    // send back relationship data
                    res.status(201).send({ message: 'Relationship created', relationship });
                }
            }
        }

    } catch (err) {
        res.status(500).send({
            message: `Error: ${err}`
        });
    }
}

const removeFriend = async (req, res) => {
    try {

    } catch (err) {

    }
}

function checkToken(req, res) {
    // check token
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        res.status(400).send({
            message: 'No bearer token'
        });

        return {
            check: false
        };
    } else {
        try {
            const token = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)

            return {
                check: true,
                value: token
            };
        } catch (err) {
            if (err.name == 'JsonWebTokenError') {
                res.status(401).send({
                    message: `Not authorized`
                });

                return {
                    check: false
                };
            }
        }

        return {
            value: false
        };
    }
}

module.exports = { addFriend };