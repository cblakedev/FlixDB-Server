const router = require('express').Router();
const { ReviewModel } = require('../models');
let validateJWT = require('../middleware/jwt-validation');



/* Write endpoint below */
// New Review
router.post('/create', async (req, res) => {
  const { title, description, rating, review, imageURL, genre, cast, ownerID } = await req.body.review
  //const id = req.user.id;
  const logReview = {
      title,
      description,
      rating,
      review,
      imageURL,
      genre,
      cast, 
      ownerID
  }
  try {
      const newReview = await ReviewModel.create(logReview);
      console.log(newReview);
      res.status(200).json(newReview)
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Update Review

router.put("/:id", async (req, res) => {
  const { review } = await req.body.review;
  const reviewId = req.params.id;
  //const userId = req.user.id;

  const query = {
      where: {
          id: reviewId,
          //ownerID: userId
      }
  };

  const updateReview = {
      review: review
  };

  try {
      const update = await ReviewModel.update(updateReview, query);
      res.status(200).json(update);
  } catch (err) {
      res.status(500).json({error: err.message });
  }
});


// Delete Review
router.delete("/delete/:id", async (req, res) => {
    // const ownerID = req.user.id;
    const reviewId = req.params.id;
  
    try {
      const query = {
        where: {
          id: reviewId,
          // ownerID: ownerID
        }
      };
  
      await ReviewModel.destroy(query);
      res.status(200).json({ message: "Review Entry Removed"});
    } catch (err) {
      res.status(500).json({ error: err });
    }
  })

module.exports = router