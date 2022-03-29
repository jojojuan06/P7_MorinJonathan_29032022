//Imports
const express = require('express');
const router = express.Router();
const postControler = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const limiter = require('../middleware/rate-limit'); //importe le fichier (limiter les requete avant auth)

//Routage (crée ,lire , modifier ,supprimer un post)
router.post("/create", limiter.modify, auth, multer, postControler.create);
router.get("/", limiter.get, auth,  postControler.listPosts);
router.put("/update", limiter.modify, auth, multer, postControler.update)
router.delete("/delete", postControler.delete)

module.exports = router;