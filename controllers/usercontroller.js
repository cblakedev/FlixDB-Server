const router = require('express').Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { UserModel } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateJWT = require('../middleware/jwt-validation');

/* Register User Endpoint*/
router.post('/register', async (req, res) => {

    let { username, password, image, userBio } = req.body.user; //deconstructs the requests' username and password

    try {
        const User = await UserModel.create({ //creates new instance of username and password based on the request
            username,
            password: bcrypt.hashSync(password, 17),//utilizes bcrypt to salt req.password and produce hashed password
            image = '',
            userBio = ''
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: '1 day'});

        res.status(202).json({ //if req is successful, return text/object as JSON
            message: 'Successfully registered!',
            user: User,
            sessionToken: token
        })
    } catch (err) {
        if (err instanceof UniqueConstraintError) { //returns an error if user tries to use an already made username
            res.status(409).json({
                message: "Username already in use. Please try a different username.",
            });
        } else {
            res.status(500).json({ //returns an error if request is unsuccessful
                message: "Failed to register",
            });
        }
    }
})

/* User Login Endpoint */
router.post('/login', async (req, res) => {

    let { username, password } = req.body.user;

    try {
        const verifiedUser = await UserModel.findOne({ //finds a property within the DB that matches the req's username
            where: {
                username: username
            }
        });

        if (verifiedUser) { //if there's a matched username run code below

            let verifiedPassword = await bcrypt.compare(password, verifiedUser.password); //verifies if password in DB matches password of the user who made the request
            

            if (verifiedPassword) { //run code below if password is a match
                let token = jwt.sign({id: verifiedUser.id}, process.env.JWT_SECRET, {expiresIn: '1 day'});

                res.status(201).json({
                    message: `Welcome back, ${verifiedUser.username}!`,
                    user: verifiedUser,
                    sessionToken: token
                });
            } else {
                res.status(401).json({ //return below if username or password is a mismatch
                    message: 'Login Failed: Incorrect username or password.'
                });
            }
        } else {
            res.status(401).json({//return below if username or password is a mismatch
                message: "Login Failed: Incorrect username or password"
            });
        }
    } catch (err) {
        res.status(500).json({//returns an error if request is unsuccessful
            error: "There's an error logging in"
        })
    }
})

//Edit User Image and Bio
router.put("/:id", validateJWT, async (req, res) => {
    const { image, userBio } = req.body.user;
    const userId = req.params.id;

    const query = {
        where: {
            id: userId
        }
    };

    const updateUser = {
        image: image,
        userBio: userBio
    };

    try {
        const update = await UserModel.update(updateUser, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;