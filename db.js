const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL 
    , process.env.HOST != 'local' ? {
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


//     || `postgres://postgress:${encodeURIComponent(process.env.PASS)}@localhost:5432/movie-reviews`,
// {
//     dialect: 'postgres',
//     ssl: process.env.ENVIRONMENT === 'production'
// }
module.exports = sequelize;