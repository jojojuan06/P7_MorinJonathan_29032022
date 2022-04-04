//Imports
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const limiter = require('../middleware/rate-limit'); //importe le fichier (limiter les requete avant auth)

//Routage (crée ,lire , modifier ,supprimer un post)
router.post("/", limiter.modify, auth, multer, commentController.createPost);//recupere un post
router.get("/", limiter.get, auth,  commentController.getAllPost); //recupere tout les posts
router.get("/:id", limiter.get, auth,  commentController.getOnePost);
router.put("/:id", limiter.modify, auth, multer, commentController.updatePost);
router.delete("/:id", auth ,commentController.deletePost);
//like un post
router.post('/:id/like', limiter.modify, auth, commentController.likePost);

module.exports = router;