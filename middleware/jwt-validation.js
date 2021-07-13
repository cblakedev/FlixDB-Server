const jwt = require('jsonwebtoken');
const {UserModel} = require('../models')

const validateJWT = async (req, res, next) => {
    if (req.method == 'OPTIONS') {
        next();
    } else if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
        const{authorization} = req.headers;
        console.log(authorization);

        const payload = authorization ? jwt.verify(authorization.includes('Bearer') ? authorization.split(' ')[1]: authorization, process.env.JWT_SECRET) : undefined;
    
        console.log(payload);

        /////////
    }
}