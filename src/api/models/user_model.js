const { Sequelize } = require('sequelize');
const db = require('../db/connection');

const User = db.define(
    'user',
    {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timeStamps: true,
        createdAt: true,
        updatedAt: true,
    }
);

User.sync({ alter: true })
    .then(() => console.log('users table synced'))
    .catch(err => console.log(`Error: ${err}`));

module.exports = User;