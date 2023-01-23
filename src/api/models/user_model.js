const { Sequelize } = require('sequelize');
const db = require('../db/connection');

const User = db.define(
    'user',
    {
        uuid: {
            type: Sequelize.CHAR(36),
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
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

User.sync({ alter: true })
    .then(() => console.log('users table synced'))
    .catch(err => console.log(`Error: ${err}`));

module.exports = User;