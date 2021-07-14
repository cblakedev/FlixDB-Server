const { DataTypes } = require('sequelize');
const db = require('../db');

const UserData = db.define('user_data', {
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userBio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ownerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    // reviewedMovies: {
    //     type: DataTypes.ARRAY,
    //     allowNull: true
    // },
    // watchlist: {
    //     type: DataTypes.ARRAY,
    //     allowNull: true
    // },
})

module.exports = UserData