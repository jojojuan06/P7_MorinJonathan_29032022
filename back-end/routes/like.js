//Imports
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like');
const auth = require('../middleware/auth');
const limiter = require('../middleware/rate-limit'); //importe le fichier (limiter les requete avant auth)


//like un post
router.post("/:id", auth, likeController.createLike);
router.delete("/:id", auth , likeController.deleteLike);






module.exports = router;