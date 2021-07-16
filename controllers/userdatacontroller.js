const router = require('express').Router();
const { UserDataModel } = require('../models');
let validateJWT = require('../middleware/jwt-validation');

// Edit User Profile
router.put("/:id", async (req, res) => {
    const { image, userBio, reviewedMovies, watchlist, ownerID } = await req.body.user;
    
})


module.exports = router;