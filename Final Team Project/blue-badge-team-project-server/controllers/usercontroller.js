const router = require('express').Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { UserModel } = require('../models');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 


/* Write Endpoints Below */



module.exports = router;