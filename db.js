const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL || `postgresql://postgres:${encodeURIComponent(process.env.Pass)}@localhost:5432/movie-reviews`, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production'
})
    
    
    
//     process.env.HOST != 'local' ? {
//     dialect: 'postgres',
//     define: {
//         timestamps: false
//     },
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// }

//     :

//     {
//         dialect: 'postgres',
//         define: {
//             timestamps: false
//         }
//     }
// )
module.exports = sequelize;