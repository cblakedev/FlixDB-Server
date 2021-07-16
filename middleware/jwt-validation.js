const jwt = require('jsonwebtoken');
const { UserModel } = require('../models')

const validateJWT = async (req, res, next) => {
    if (req.method == 'OPTIONS') {//OPTIONS is the first part of the preflighted request. This is to determine if the actual request is safe to send.
        next();//allows us to move to the next part of the code

    } else if (req.headers.authorization && req.headers.authorization.includes('Bearer')) { //checks if authorization is truthy and if the string Bearer is included
        const { authorization } = req.headers; //destructure authorization to use its properties(username, password, id)
        console.log(authorization);

        //if authorization has data verify it. Check if authorization has the string Bearer if not, extrapolate and return the token by itself.
        //verify method checks if the token and secret is valid, otherwise return undefined.
        const payload = authorization ? jwt.verify(authorization.includes('Bearer') ? authorization.split(' ')[1] : authorization, process.env.JWT_SECRET) : undefined;

        console.log(payload);

        if (payload) { //if payload is truthy find a user with a same id as the payload and save info to foundUser
            let foundUser = await UserModel.findOne({
                where: {
                    id: payload.id
                }
            });
            console.log('foundUser -->', foundUser);

            if (foundUser) { //if foundUser is truthy create a new user object using the payload information from the user else return an error
                console.log(foundUser);
                req.user = foundUser
                next()
            } else {
                res.status(400).send({
                    message: 'Not Authorized.'
                });
            }
        } else {
            res.status(401).send({
                message: 'Invalid Token.'
            });
        }
    } else {
        res.status(403).send({
            message: 'Not Authorized'
        });
    }
};

module.exports = validateJWT; //export module to be used outside of this file