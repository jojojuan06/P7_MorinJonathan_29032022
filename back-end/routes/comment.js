//Imports
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const auth = require('../middleware/auth');
const limiter = require('../middleware/rate-limit'); //importe le fichier (limiter les requete avant auth)

//Routage (crée ,lire , modifier ,supprimer un post)
router.post("/", limiter.modify, auth, commentController.createComment);//recupere un post
router.get("/", limiter.get, auth,  commentController.getAllComment); //recupere tout les posts
router.get("/:id", limiter.get, auth,  commentController.getOneComment);
router.put("/:id", limiter.modify, auth, commentController.updateComment);
router.delete("/:id", auth ,commentController.deleteComment);

module.exports = router;