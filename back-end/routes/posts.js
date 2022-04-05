//Imports
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const limiter = require('../middleware/rate-limit'); //importe le fichier (limiter les requete avant auth)

//Routage (crée ,lire , modifier ,supprimer un post)
router.post("/", limiter.modify, auth, multer, postController.createPost);//recupere un post
router.get("/", limiter.get, auth,  postController.getAllPost); //recupere tout les posts
router.get("/:id", limiter.get, auth,  postController.getOnePost);
router.put("/:id", limiter.modify, auth, multer, postController.updatePost);
router.delete("/:id", auth ,postController.deletePost);

module.exports = router;