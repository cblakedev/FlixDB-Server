const router = require('express').Router();
const ReviewModel = require('../models/reviews');
let validateJWT = require('../middleware/jwt-validation');


// New Review
router.post('/create', validateJWT, async (req, res) => {
  const { title, description, review, imageURL } = req.body.review
  const {id} = req.user;
  const logReview = {
      title,
      description,
      review,
      imageURL,
      ownerID: id
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
router.put("/:id", validateJWT, async (req, res) => {
  const { review } = await req.body.review;
  const reviewId = req.params.id;
  const userId = req.user.id;

  const query = {
      where: {
          id: reviewId,
          ownerID: userId
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
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerID = req.user.id;
    const reviewId = req.params.id;
  
    try {
      const query = {
        where: {
          id: reviewId,
          ownerID: ownerID
        }
      };
  
      await ReviewModel.destroy(query);
      res.status(200).json({ message: "Review Entry Removed"});
    } catch (err) {
      res.status(500).json({ error: err });
    }
  })

 //GET All Reviews from All Users
// router.get('/', validateJWT, async (req, res) => {
//   try {
//       const allReviews = await ReviewModel.findAll(); //find all reviews from all users. findAll is a sequelize method
//       res.status(200).json(allReviews);//if request was successful, return and jsonify the data
//   } catch(err) {
//       res.status(500).json({ //if response is 500(server error), return the error and jsonify it
//           error: `[error]: ${err}`
//       });
//   }
// });

//GET All Reviews of User
router.get('/myreviews', validateJWT, async (req, res) => {//
  const {id} = req.user

  try {
      const userReviews = await ReviewModel.findAll({//find all reviews from "ONE" user wherein "id" from current request matches owner id in the DB.
          where: {
              ownerID: id
          }
      });

      res.status(200).json(userReviews)//if successful, return and jsonify data
  } catch(err) {
      res.status(500).json({//if 500 error, return and jsonify error
          error: `[error]: ${err}`
      });
  }
})

//GET All Reviews of a Movie based on the Title
router.get('/search/:value', validateJWT, async (req, res) => {//
  const value = req.params.value

  try {
      const allReviews = await ReviewModel.findAll({//find all reviews from all users wherein title from current request matches title in the DB.
          where: {
              title: value
          }
      });

      res.status(200).json(allReviews)//if successful, return and jsonify data
  } catch(err) {
      res.status(500).json({//if 500 error, return and jsonify error
          error: `[error]: ${err}`
      });
  }
})

module.exports = router