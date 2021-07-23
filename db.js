require('dotenv').config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, process.env.HOST != 'local' ? {
    dialect: 'postgres',
    define: {
        timestamps: false
    },
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
        define: {
            timestamps: false
        }
    }
)
module.exports = sequelize;