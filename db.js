const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABSE_URL || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost:5432/movie-reviews`, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'main'
});

module.exports = sequelize;