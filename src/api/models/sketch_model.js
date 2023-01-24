const { Sequelize } = require('sequelize');
const db = require('../db/connection');
const User = require('./user_model');

const Sketch = db.define(
    'sketch',
    {
        uuid: {
            type: Sequelize.CHAR(36),
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        sender_uuid: {
            type: Sequelize.CHAR(36),
            allowNull: false,
            references: {
                model: User,
                key: 'uuid'
            }
        },
        receiver_uuid: {
            type: Sequelize.CHAR(36),
            allowNull: false,
            references: {
                model: User,
                key: 'uuid'
            }
        },
        bin: {
            type: Sequelize.BLOB,
            allowNull: false
        }
    },
    {
        timeStamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

Sketch.sync({ alter: true })
    .then(() => console.log('sketches table synced'))
    .catch(err => console.log(`Error: ${err}`));

module.exports = Sketch;