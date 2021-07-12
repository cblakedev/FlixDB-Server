const router = require('express').Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { UserModel } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


/* Register User Endpoint*/
router.post('/register', async (req, res) => {

    let { username, password } = req.body.user; //deconstructs the requests' username and password

    try {
        const User = await UserModel.create({ //creates new instance of username and password based on the request
            username,
            password: bcrypt.hashSync(password, 17)//utlizes bcrypt to salt req.password and produce hashed password
        });

        res.status(202).json({ //if req is succesful, return text/object as JSON
            message: 'Succesfully registered!',
            user: User,
        })
    } catch (err) {
        if (err instanceof UniqueConstraintError) { //returns an error if user tries to use an already made username
            res.status(409).json({
                message: "Username already in use. Please try a different username.",
            });
        } else {
            res.status(500).json({ //returns an error if request is unsuccesful
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
                res.status(201).json({
                    message: `Welcome back, ${verifiedUser.username}!`,
                    user: verifiedUser,
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
        res.status(500).json({//returns an error if request is unsuccesful
            error: "There's an error logging in"
        })
    }
})


module.exports = router;