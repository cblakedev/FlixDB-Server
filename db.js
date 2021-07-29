const Sequelize = require("sequelize");
<<<<<<< HEAD
const sequelize = new Sequelize(process.env.DATABASE_URL, process.env.HOST !== 'local' ?
    {
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
);
=======
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
>>>>>>> 2320266f5c332238316f6e393e6a93a1e4f176e7

    :

    {
        dialect: 'postgres',
        define: {
            timestamps: false
        }
    }
)
module.exports = sequelize;