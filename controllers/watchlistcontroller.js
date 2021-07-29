const router = require('express').Router();
const { WatchlistModel } = require('../models');
let validateJWT = require('../middleware/jwt-validation');

// New Watchlist Item
router.post("/create", validateJWT, async (req, res) => {
    const { title, description, imageURL, genre, cast } = await req.body.watchlist;
    const id = req.user.id;
    const addMovie = {
        title, 
        description, 
        imageURL,
        ownerId: id
    }
    try {
        const newMovie = await WatchlistModel.create(addMovie);
        console.log(newMovie);
        res.status(200).json(newMovie)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Watchlist
router.get("/mine", validateJWT, async (req, res) => {
    const id = req.user.id;
    try {
        const userWatchlist = await WatchlistModel.findAll({
            where: {
                ownerId: id
            }
        });
        res.status(200).json(userWatchlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Watchlist Item
router.delete("/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const watchlistId = req.params.id;

    try {
        const query = {
            where: {
                id: watchlistId,
                ownerId: ownerId
            }
        };

        await WatchlistModel.destroy(query);
        res.status(200).json({ message: "Movie removed from watchlist "});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;