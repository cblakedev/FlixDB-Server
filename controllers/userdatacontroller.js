const router = require('express').Router();
const { UserDataModel } = require('../models');
let validateJWT = require('../middleware/jwt-validation');


/* Write Endpoints Below */

// UserData Create

router.post("/create", async (req, res) => {
    const { image, userBio, ownerID  } = req.body.user_data;
    // const { id } = req.user;
    const UserData = {
        image,
        userBio,
        ownerID
    }
    try {
       const newUserData = await UserDataModel.create(UserData);
       res.status(200).json(newUserData);
    } catch (err) {
      res.status(500).json({ error: err});  
    }
    // UserDataModel.create(UserData)  

    });

// Update UserData

router.put("/:id", async (req, res) => {
    const { image, userBio } = req.body.user_data;
    const UserDataId = req.params.id;
    // const userId = req.user.id;
  
    const query = {
      where: {
        id: UserDataId,
        // owner: userId
      }
    };
  
    const updatedUserData = {
      image: image,
      userBio: userBio,
    };
  
    try {
      const update = await UserDataModel.update(updatedUserData, query);
      res.status(200).json(update);  
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });


module.exports = router;