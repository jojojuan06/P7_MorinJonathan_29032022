//Imports
const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const limiter = require('../middleware/rate-limit'); //importe le fichier (limiter les requete avant auth)

//Routage (crée ,lire , modifier ,supprimer un post)
router.post("/", limiter.modify, auth, multer, postController.create);
router.get("/", limiter.get, auth,  postController.allPosts);
router.get("/:id", limiter.get, auth,  postController.onePosts);
router.put("/:id", limiter.modify, auth, multer, postController.update)
router.delete("/:id", postController.delete)
//like un post
router.post('/:id/like', limiter.modify, auth, postController.likePost);

module.exports = router;