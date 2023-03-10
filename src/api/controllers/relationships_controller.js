const Relationship = require('../models/relationship_model');
const User = require('../models/user_model');
const { Op } = require('sequelize');
const { checkToken } = require('../utils/functions');

const createRelationship = async (req, res) => {
    const { otherUUID, blocked } = req.body;

    try {
        if (!otherUUID || !blocked) {
            res.status(400).send({
                message: 'Missing data'
            });
        } else {
            const token = checkToken(req, res);

            if (token.check) {            
                const { uuid } = token.value;

                // check other uuid
                const userExists = await User.findOne({
                    where: {
                        uuid: otherUUID
                    }
                });
            
                // check wether user already exists
                if (!userExists || userExists.uuid == uuid) {
                    res.status(400).send({
                        message: 'Invalid UUID'
                    });
                } else {
                    // check wether relationship already exists
                    const relshipExists = await Relationship.findOne({
                        where: {
                            [Op.and]: {
                                user_uuid: uuid,
                                other_uuid: otherUUID
                            }
                        }
                    });
                
                    if (relshipExists) {                        
                        if (relshipExists.blocked == blocked) {
                            res.status(400).send({
                                message: 'Relationship already exists'
                            });
                        } else {
                            await relshipExists.update({ blocked });

                            res.status(200).send({
                                relationship: relshipExists
                            });
                        }
                    } else {
                        const relationship = await Relationship.create(
                            {
                                user_uuid: uuid,
                                other_uuid: otherUUID,
                                blocked
                            }
                        );

                        res.status(201).send({ relationship });             
                    }
                }
            }
        }
    } catch (err) {
        res.status(500).send({
            message: `Error: ${err}`
        });
    }
}

const removeRelationship = async (req, res) => {
    try {
        const { otherUUID } = req.body;

        if (!otherUUID) {
            res.status(400).send({
                message: 'Missing data'
            });
        } else {
            const token = checkToken(req, res);

            if (token.check) {
                const { uuid } = token.value;

                const exists = await Relationship.findOne({
                    where: {
                        [Op.and]: {
                            user_uuid: uuid,
                            other_uuid: otherUUID
                        }
                    }
                });

                if (!exists) {
                    res.status(400).send({
                        message: 'Invalid relationship'
                    });
                } else {
                    await Relationship.destroy({
                        where: {
                            [Op.and]: {
                                user_uuid: uuid,
                                other_uuid: otherUUID
                            }
                        }
                    });
    
                    res.status(200).send({
                        message: 'Relationship deleted'
                    });
                }
            }
        }
    } catch (err) {
        res.status(500).send({
            message: `Error: ${err}`
        });
    }
}

const getRelationships = async (req, res) => {
    try {
        // check token
        const token = checkToken(req, res);
        const paramUUID = req.params.uuid;

        if (token.check) {
            const { uuid } = token.value;

            if (uuid != paramUUID) {
                res.status(400).send({
                    message: 'Unauthorized'
                });
            } else {
                const relationships = await Relationship.findAll({
                    where: {
                        user_uuid: uuid
                    }
                });

                res.status(200).send({ relationships });
            }
        }
    } catch (err) {
        res.status(500).send({
            message: `Error: ${err}`
        });
    }
}

module.exports = { createRelationship, removeRelationship, getRelationships };