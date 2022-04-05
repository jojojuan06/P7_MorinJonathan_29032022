//Imports
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like');
const auth = require('../middleware/auth');
const limiter = require('../middleware/rate-limit'); //importe le fichier (limiter les requete avant auth)


//like un post
router.post("/:id", limiter.modify, auth, likeController.createLike);
router.get("/", limiter.get, auth,  likeController.getAllLike); //recupere tout les posts
router.get("/:id", limiter.get, auth,  likeController.getOneLike);
router.put("/:id", limiter.modify, auth, likeController.updateLike);
router.delete("/:id", auth , likeController.deleteLike);

module.exports = router;