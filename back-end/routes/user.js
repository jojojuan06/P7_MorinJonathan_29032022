//Route utilisateur

// **** aplication express require pour importer router
const express = require('express');
const userControllers = require('../controllers/user'); // importation du controller user
const limiter = require('../middleware/rate-limit'); //importe le fichier (limiter les requete avant auth)
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
// Creation d'un routeur
const router = express.Router(); // avec la methode routeur d'expresse (ex remplace app.get par router.get)

//---------  Routes  -----------
//POST LOGIN /NEW ACCOUNT
router.post('/signup',limiter.auth,  multer, userControllers.signup); // recuperation de l'url du post et du contenue post (creatething(objet body))
router.post('/login', limiter.auth, userControllers.login); // adresse de la function
//--------
router.get('/:id/user', limiter.get, auth,  userControllers.getOneUser); //recuperer un user
router.get('/users', limiter.get, auth,  userControllers.getAllUser); //recuperer des users
router.put('/:id/user',limiter.modify, auth, multer, userControllers.updateUser);//modification d'un user(profil)
router.delete('/:id/user', auth, userControllers.deleteUser);
//-----------------

// exporter le router
module.exports = router;