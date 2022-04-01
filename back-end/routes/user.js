//Route utilisateur

// **** aplication express require pour importer router
const express = require('express');
const userControllers = require('../controllers/user'); // importation du controller user
const limiter = require('../middleware/rate-limit'); //importe le fichier (limiter les requete avant auth)
// Creation d'un routeur
const router = express.Router(); // avec la methode routeur d'expresse (ex remplace app.get par router.get)

//---------  Routes  -----------
//POST LOGIN /NEW ACCOUNT
router.post('/auth/signup',limiter.auth, userControllers.signup); // recuperation de l'url du post et du contenue post (creatething(objet body))
router.post('/auth/login', limiter.auth, userControllers.login); // adresse de la function
//--------
//router.get('/users/:id', limiter.get, auth,  userControllers.getOneUser); //recuperer un user
//router.put('/users/:id',limiter.modify, auth, userControllers.changeUser);//modification d'un user(profil)
//router.delete('/users/:id', auth, userControllers.deleteUser);
//-----------------

// exporter le router
module.exports = router;