const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }, 

    image: {
        type: DataTypes.STRING,
        allowNull: true
    }, 

    userBio: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = User