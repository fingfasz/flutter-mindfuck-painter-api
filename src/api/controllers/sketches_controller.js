const Sketch = require('../models/sketch_model');
const User = require('../models/user_model');
const { Op } = require('sequelize');
const { checkToken } = require('../utils/functions');

const createSketch = async (req, res) => {
    try {
        const token = checkToken(req, res);

        const { uuid } = token.value;
        const { receiverUUID, bin } = req.body;
    
        const sketch = await Sketch.create({ sender_uuid: uuid, receiver_uuid: receiverUUID, bin });
    
        res.status(201).send({ sketch });
    } catch (err) {
        res.status(400).send(err);
    }
}

const deleteSketch = async (req, res) => {
    try {
        const { uuid } = req.body;

        const sketch = await Sketch.findOne({
            where: {
                uuid 
            }
        });

        if (!sketch){
            res.status(400).send({ message: 'invalid sketch' })
        } else {
            await Sketch.destroy({
                where: {
                    uuid 
                }
            });

            res.status(200).send();
        }

    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

module.exports = { createSketch, deleteSketch }