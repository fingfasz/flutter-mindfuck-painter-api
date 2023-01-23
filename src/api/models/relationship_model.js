const { Sequelize } = require('sequelize');
const db = require('../db/connection');
const User = require('./user_model');

const Relationship = db.define(
    'relationship',
    {
        uuid: {
            type: Sequelize.CHAR(36),
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        user_uuid: {
            type: Sequelize.CHAR(36),
            allowNull: false,
            references: {
                model: User,
                key: 'uuid'
            }
        },
        other_uuid: {
            type: Sequelize.CHAR(36),
            allowNull: false,
            references: {
                model: User,
                key: 'uuid'
            }
        },
        blocked: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    },
    {
        timeStamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Relationship.sync({ alter: true })
    .then(() => console.log('relationships table synced'))
    .catch(err => console.log(`Error: ${err}`));

module.exports = Relationship;