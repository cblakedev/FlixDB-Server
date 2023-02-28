const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, process.env.HOST != 'localhost' ? {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}
    :
    {
        dialect: 'postgres',
    }
)


module.exports = sequelize;