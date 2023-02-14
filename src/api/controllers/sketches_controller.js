const Sketch = require('../models/sketch_model');
const User = require('../models/user_model');
const { Op } = require('sequelize');
const { checkToken } = require('../utils/functions');

const createSketch = async (req, res) => {
    const token = checkToken(req, res);

    const { uuid } = token.value;
    const { receiverUUID, bin } = req.body;

    const sketch = await Sketch.create({ sender_uuid: uuid, receiver_uuid: receiverUUID, bin });

    res.status(201).send({ sketch });
}

module.exports = { createSketch }