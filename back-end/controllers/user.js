/// Controller utilisateur------------- (contenue route utilisateur  POST)

//importer des fichier
require('dotenv').config({ path:'../.env' });// proteger les donnée , adresse (path: chemin) du .env pour le process

// importe package express (npm)
const bcrypt = require('bcrypt'); //importer package de cryptage (recupere)
const jwt = require('jsonwebtoken'); //crée des token et les verifier
const validator = require('validator'); //valide et nettoie uniquement les chaînes (validation de l'email)
//vas chercher tout mes models
const { User } = require('../models')// recuperer index.js. ,qui vas me cherche mes models



//enregistrement de nouveaux utilisateur(crypter le mdp , cree un new user avec hash +email et enregistrer user dans la bdd)
exports.signup = (req, res, next) => {
    const email = req.body.email; // recupere l'email du corp de la requete
    //verification de email
    if (!validator.isEmail(email)) { //si se n'est pas un email valide (validator) on retourne l'erreur
    return res.status(400).json({ error: `l'email ${email} n'est pas valide`})    
    }
    //verification du mot de passe
    const password = req.body.password;
     if (!validator.isStrongPassword(password)) { //si se n'est pas un password valide (validator) on retourne l'erreur
            return res.status(400).json({ error: `le password ${password} n'est pas valide`})    
        }
    //cryptage un mot de pass , on lui pass de mdp
    bcrypt.hash(req.body.password, 10) // 10 tour pour verifier l'algoritme (methode asyncrone)
    .then(hash => { // recuper le hash(mdp crypter)  de mdp 
        //creation du new utilisateur
        const user = new User({ //creation un nouvelle utilisateur (user) 
        email: req.body.email, // email passez l'addresse passsez dans le corp de la requete
        password :hash // enregistrer le mdp crypter (hash) pour ne pas stocker un mdp en blanc
        });
        user.save() //enregistre dans la BDD    
        .then(() => res.status(201).json({message: 'utilisateur créé !'})) //creation de ressource
        .catch(error => res.status(400).json({ error })); //impossible de se connecter au serveur
    })
    .catch(error => res.status(500).json({ error })); // 500 erreur serveur renvoi erreur dans objet
};  


//connecter un utilisateur existant
exports.login = (req, res, next) => {
    //db pour trouver un seul utilisateur de la BD , where cible l'element  
    User.findOne({ Where:{ email: req.body.email } }) //on veut que email correspond a la req
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
                // sign de jsonwebtoken pour encoder un nouveau token ;
                //creation de token---------
                token: jwt.sign( //token crypter pour permettre la connection de l'utilisateur
                // cree un userid qui sera l'identifiant utilisateur du user
                { userId : user.id ,// payload les donnée que le veut encoder a l'interieure de ce token (cree un objet user id)
                admin : user.admin}, //creation du cryptage admin ;si il l'est
                process.env.SECRET_KEY,  // deuxieme argument clée secrete de l'encodage du .env qui est masqué
                { expiresIn: '24h'} //troisieme argument (de config) apliquer une expiration du token de 24h
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
    req.params.id // avoir acces  dans l'objet req.pams.id
    User.findOne( { WHERE:{id: req.params.id},//trouver un objet avec WHERE , on pass l'objet en conparaison _id  egal le parm de req id
    attributes:["email","name","firstname"] //clef que je veut montrer en clair
    }) 
    .then(user => res.status(200).json(user)) // retourne la response 200 pour ok pour la methode http , renvoi l'objet (un objet)si il existe dans la Bd
    .catch(error => res.status(404).json({ message: `objet non trouvé: ${error}` }));
}
//-----------------

// recuperer tout les utilisateur GET
exports.getAllUser = (req, res, next) => {    
    //création des objet-----------
    User.find({
    attributes:["email","name","firstname"] //clef que je veut montrer en clair    
    }) //trouve la liste d'objet (find) qui nous retourne une promise , envoi un tableau contenant tous les users dans notre base de données
        .then(users => res.status(200).json(users)) // retourne la response 200 pour ok pour la methode http , revoi le tableaux des users recu
        .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); 
    }
//----------------




//-----------------
//admin : user.admin
// modifier l'utilisateur PUT
exports.updateUser = (req, res, next) => {//exporter une function createuser / contenue de la route post / creation dun post
    User.findOne({ WHERE:{ id: req.params.id,}})
    .then(user => { // si l'utilisateur et admin il peut modif les utili ou juste l'util modif sont profil
    if (user.id === req.auth.userId ||  req.auth.admin == true ) {
        //test le cas de figure ou on se trouve
        const userObject = req.file ?//si req.file exist (ternaire)
            {
            ...JSON.parse(req.body.user),//si il exist il faut le prendre en compte  l'ojet du produit
            //on genere une nouvelle image url
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//adresse de l'image en interpolation 
            } : { ...req.body };//sinon il n'exite pas on copie l'objet (corp de la requete)
            db.User.updateOne({ WHERE: { id: req.params.id }}, // egale (clée -> valeur) dans la base de donnée (trouver avec where)
            { ...userObject, id: req.params.id })//pour correspondre a l'id des param de la req et dire que l'id corespond a celui des paramettre (mettre a jour son produit)
            //spread pour recuperer le user (produit) qui est dans le corp de la requete que l'on a cree et on modifier sont identifiant
            .then(() => res.status(200).json({ message: 'Objet modifié !'}))// retourne la response 200 pour ok pour la methode http , renvoi objet modifier
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));    
        } else {
            res.status(403).json({ message: `vous n'etes pas autoriser a modifiée ce profil` });  
        }
    })
    .catch(error => res.status(404).json({ message: `nous faisons face a cette: ${error}` })); 
    
};
//-----------------

// supprimer l'utilisateur DELETE
exports.deleteUser = (req, res, next) => {
    // allez le chercher et avoir l'url de l'image pour la supprimer (cherche le produit)
    User.findOne({ WHERE:{ id: req.params.id}})
    //trouver id a celui qui est dans les parametres de la req ,recupere un user (produit) dans le callback (function de rapelle)
    .then((user) => {// recupere le user dans la base
            if (!user) { // si user n'existe pas
                return res.status(404).json({ message: "L'utilisateur n'existe pas !"})
            }
            // verifier que seulement la personne qui peu le supprimer
            if (user.id === req.auth.userId ||  req.auth.admin == true ) { 
            //split retourne un tableaux de que qu'il y a avant  /image , apres /image
            const filename = user.imageUrl.split('/images/')[1];//extraire le fichier , recup l'image url du produit retourner par la base,le2eme pour avoir le nom du fichier
                // package fs , unlinke pour supprimer un fichier (1 arg(chemin fichier , 2 arg(callback apres supprimer)))
                fs.unlink(`images/${filename}`, () => { //filename fait reference au dossier image
                //recuperer l'id des paramettre de route ,si oui on effectue la suppression
                db.User.destroy({id: req.params.id }) // egale (clée -> valeur) function pour supprimer un users (produit) dans la base de donnée    
                .then(() => res.status(200).json({message: 'Objet supprimer !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
                .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)   
            });      
            }
            else {//probleme authentification ,on verifier qu'il appartient bien  a la personne qui effectuer la req
                return res.status(401).json({ 
                error: new Error('Requete non autorisé !')
                });
            } 
        })
        .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
};
//-----------------
