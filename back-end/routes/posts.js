//Imports
const express = require('express');
const router = express.Router();
//const postControler = require('../controllers/posts');
//const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const limiter = require('../middleware/rate-limit'); //importe le fichier (limiter les requete avant auth)

//Routage (crée ,lire , modifier ,supprimer un post)
router.post("/", limiter.modify, auth, multer, postControler.create);
router.get("/", limiter.get, auth,  postControler.allPosts);
router.get("/:id", limiter.get, auth,  postControler.onePosts);
router.put("/:id", limiter.modify, auth, multer, postControler.update)
router.delete("/:id", postControler.delete)
//like un post
router.post('/:id/like', limiter.modify, auth, postControllers.likePost);

module.exports = router;