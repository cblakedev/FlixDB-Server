const router = require('express').Router();
const { ReviewModel } = require('../models');
let validateJWT = require('../middleware/jwt-validation');



/* Write endpoint below */

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerID = req.user.id;
    const reviewID = req.params.id;
  
    try {
      const query = {
        where: {
          id: reviewID,
          owner: ownerID
        }
      };
  
      await ReviewModel.destroy(query);
      res.status(200).json({ messge: "Review Entry Removed"});
    } catch (err) {
      res.status(500).json({ error: err });
    }
  })

module.exports = router