/// Controller utilisateur------------- (contenue route utilisateur  POST)

//importer des fichier
require('dotenv').config({ path:'../.env' });// proteger les donnée , adresse (path: chemin) du .env pour le process
const fs =  require('fs');

// importe package express (npm)
const bcrypt = require('bcrypt'); //importer package de cryptage (recupere)
const jwt = require('jsonwebtoken'); //crée des token et les verifier
const validator = require('validator'); //valide et nettoie uniquement les chaînes (validation de l'email)
//vas chercher tout mes models
const { User } = require('../models')// recuperer index.js. ,qui vas me cherche mes models



//enregistrement de nouveaux utilisateur(crypter le mdp , cree un new user avec hash +email et enregistrer user dans la bdd)
exports.signup = (req, res, next) => {
    const email = req.body.email; // recupere l'email du corp de la requete
    const name = req.body.name;
    //verification de email
    if (!validator.isEmail(email)) { //si se n'est pas un email valide (validator) on retourne l'erreur
        return res.status(400).json({ error: `l'email ${email} n'est pas valide`})    
    }
    //verification du mot de passe
    const password = req.body.password;
    if (!validator.isStrongPassword(password)) { //si se n'est pas un password valide (validator) on retourne l'erreur
        return res.status(400).json({ error: `votre mot de passe doit contenir au moins 8 charactères,
        dont une lettre minuscule, une majuscule, un chiffre et un charctère spécial`}
        )    
    }
    // Permet de vérifier que l'utilisateur que l'on souhaite créer n'existe pas déjà
    User.findOne({ attributes: ['name' || 'email'],
        where: { 
            name: name, 
            email: email
        }
    })
    .then(userExist => {
        if (!userExist) { //si l'utilisateur n'exite pas
            //cryptage un mot de pass , on lui pass de mdp
            bcrypt.hash(req.body.password, 10) // 10 tour pour verifier l'algoritme (methode asyncrone)
            .then(hash => { // recuper le hash(mdp crypter)  de mdp 
                //creation du new utilisateur
                let user = new User({ //creation un nouvelle utilisateur (user)
                    name: req.body.name,
                    firstname: req.body.firstname,         
                    email: req.body.email, // email passez l'addresse passsez dans le corp de la requete
                    password: hash, // enregistrer le mdp crypter (hash) pour ne pas stocker un mdp en blanc
                    admin: req.body.admin//valeur par default crée (0/false)
                });
                user.save()//methode save enregistre l'objet dans la base de donnée renvoi une promise    
                .then(() => res.status(201).json({message: 'utilisateur créé !'})) //creation de ressource
                .catch(error => res.status(400).json({ error })); //impossible de se connecter au serveur
            })
            .catch(error => res.status(500).json({ error })); // 500 erreur serveur renvoi erreur dans objet    
        } else {
            return res.status(404).json({ message: "l'utilisateur existe deja"})
        }
    })
    .catch(error => res.status(500).json({ error })); // 500 erreur serveur renvoi erreur dans objet     
};  

//connecter un utilisateur existant
exports.login = (req, res, next) => {
    //db pour trouver un seul utilisateur de la BD , where cible l'element  
    User.findOne({ where:{ email: req.body.email } }) //on veut que email correspond a la req
    .then(user => {
        //si user (!user) n'est pas trouver  on renvoi le return message d'error
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        } //sinon l'user a etait trouver et on compare le mdp crypte de l'utilisateur qui se connect
        bcrypt.compare(req.body.password, user.password) // function pour comparer les mdp hash (crypter) envoyer par la req ,
        // et le hash deja enregistrer (le hash du user)
        .then(valid => {  //recoit un boolean (true false comparaison valid ou non)
            if (!valid) { //false mauvais utilisateur mdp
                return res.status(401).json({ error: 'Mot de passe incorrect !' }); 
            } // sinon true on continue
            res.status(200).json({ // on verifie que la requete correspond a ce user_id
                userId: user.id, //id de l'utilisateur das la base (objet)
                admin: user.admin,
                // sign de jsonwebtoken pour encoder un nouveau token ;
                //creation de token---------
                token: jwt.sign( //token crypter pour permettre la connection de l'utilisateur
                // cree un userid qui sera l'identifiant utilisateur du user
                { userId : user.id ,// payload les donnée que le veut encoder a l'interieure de ce token (cree un objet user id)
                admin : user.admin}, //creation du cryptage admin ;si il l'est
                process.env.SECRET_KEY,  // deuxieme argument clée secrete de l'encodage du .env qui est masqué
                { expiresIn: '12h'} //troisieme argument (de config) apliquer une expiration du token de 12h
                )  
            });
        }) 
        .catch(error => res.status(500).json({ message: `nous faisons face a cette: ${error}` }));   
    })
    .catch(error => res.status(500).json({ message: `nous faisons face a cette: ${error}` })); 
};

//----------------



// recuperer un utilisateur GET
exports.getOneUser = (req, res, next) => { 
    const id = req.params.id; // avoir acces  dans l'objet req.pams.id
    User.findOne({
        where:{id: id},//trouver un objet avec where , on pass l'objet en conparaison id  egal le parm de req id
        attributes:["email","name","firstname","profile_img","id"] //clef que je veut montrer en clair
    })
    .then(user => {
    if (!user) { 
        //si l'utilisateur n'existe pas retourne le message (null)
        return res.status(404).json({message: `l'utilisateur n'existe pas`}); //404 ressource non trouvé user
        // sinon ok on retounr l'utilisateur
    } else { 
        return res.status(200).json(user) // retourne la response 200 pour ok pour la methode http , renvoi l'objet si il existe dans la Bd    
    }
    })
    .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
}
//-----------------

// recuperer tout les utilisateur GET
exports.getAllUser = (req, res, next) => {    
    User.findAll({
        //sélectionner que certains attributs, clef que je veut montrer en clair   
        attributes:["email","name","firstname","profile_img","id"]   
    })
    // retourne la response 200 pour ok pour la methode http , revoi le tableaux des users recu
    .then(users => res.status(200).json(users)) 
    .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); 
}
//----------------




//-----------------
//admin : user.admin
// modifier l'utilisateur PUT
exports.updateUser = (req, res, next) => {
    User.findOne({ where:{ id: req.params.id,}}) // trouve la première entrée dans ta table ou le champ 'id' est égal à req.params.id
    .then(user => { // si l'utilisateur et admin il peut modif les utili ou juste l'util modif sont profil    
        if (user.id == req.auth.userId ||  req.auth.admin == true ) {
            //copie les valeurs de toutes les propriétés directes (non héritées)
            const newUser = Object.assign(user,req.body); // remplace le user par le new user (objet,permet d'envoyer des champ vide(recupere un champ)) 
            if (req.files) { //si il y a une img dans la req (sur fichier multiple)
                //verification si l'extensions et valid
                const extension = req.files.profile_img[0].mimetype;
                if (extension == "image/jpg" || extension == "image/png" ||  extension == "image/webp"||  extension == "image/jpeg") {
                    if (user.profile_img != '') { //verifier si le user a deja une image de profil
                        // package fs , unlinke pour supprimer un fichier 
                        fs.unlink(`images/${user.profile_img}`, () => {
                         }); //filename fait reference au dossier image (on suprime)
                    }
                    newUser.profile_img = `${req.files.profile_img[0].filename}` //remplace pas la new img (premier element du field(tableau))
                }else {
                    return res.status(400).json({message: `le format de fichier n'est pas autoriser ${extension}`});
                }
            }
            newUser.save() //sauvegarde le nouveau user
            .then(() => res.status(200).json({ message: 'Profile modifié !'}))// retourne la response 200 pour ok pour la methode http , renvoi objet modifier
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));    
        } else {
            res.status(403).json({ message: `vous n'etes pas autoriser a modifiée l'utilisateur` });  
        }
    }) 
    .catch(error => res.status(404).json({ message: `nous faisons face a cette: ${error}` }))    
};
//-----------------

// supprimer l'utilisateur DELETE
exports.deleteUser = (req, res, next) => {
    // allez le chercher et avoir l'url de l'image pour la supprimer (cherche le produit)
    User.findOne({ where:{ id: req.params.id}})
    //trouver id a celui qui est dans les parametres de la req ,recupere un user (produit) dans le callback (function de rapelle)
    .then((user) => {// recupere le user dans la base
        if (!user) { // si user n'existe pas
            return res.status(404).json({ message: "L'utilisateur n'existe pas !"})
        }
        // verifier que seulement la personne qui peu le supprimer
        if (user.id == req.auth.userId ||  req.auth.admin == true ) { 
            if (user.profile_img != '') {
                // package fs , unlinke pour supprimer un fichier,suprimer l'image si il y en a une
                fs.unlink(`images/${user.profile_img}`, () => {}) 
            }    
            //recuperer l'id des paramettre de route ,si oui on effectue la suppression
            user.destroy() // egale (clée -> valeur) function pour supprimer un users (produit) dans la base de donnée    
            .then(() => res.status(200).json({message: 'Utilisateur supprimer !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
            .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)        
        }
        else {//probleme authentification ,on verifier qu'il appartient bien  a la personne qui effectuer la req
            return res.status(403).json({ message: 'utilisateur non autorisé !'}); //comprend la req / refus de l'auth
        } 
    })
    .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
};
//-----------------
