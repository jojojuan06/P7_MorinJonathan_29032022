// CREATE READ UPDATE DELTE POSTS AND LIKE 

//valide et nettoie uniquement les chaînes (validation de l'email)
const validator = require('validator'); 
const { User, Comment } = require('../models')


//Creation d'un Commentaire POST
exports.createComment = (req, res, next) => { //function de callback
    //verifier si les champs sont vides (avant submit ,ex name ou description ect..(le front-end n'est pas fiable))
    if (validator.isEmpty(`${req.body.content}`)) {
        return res.status(400).json({ message: `le champs ne doit pas être vide`})    
    }
    //verification du contenue text 
    if (req.body.content == null) { 
        return res.status(400).json({ message : `Votre commentaire doit contenir du texte`})
    } 
    // verifier un nombre de caractere donnée
    if (req.body.content.length <= 4 ) {
        return res.status(400).json({ message : `Votre Commentaire doit contenir au moins 4 caractère`})  
    }
    // creation d'une nouvelle instance  de mon objet post (class) de le req
    let comment = new Comment({  //recupere mon objet de la req
    content: req.body.content,
    PostId: req.body.postId, 
    UserId : req.auth.userId  // ajoute id comment = userid de la req
    });
    console.log(comment);
    comment.save()//methode save enregistre l'objet dans la base de donnée renvoi une promise
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !'})) //201 la requête a réussi avec le message
    .catch(error => res.status(400).json({ message: `⚠ Oops, une erreur s\'est produite !${error}`}));
};
//-------------


//mettre a jour d'un Commentaire PUT
exports.updateComment = (req, res, next) => {//exporter une function createuser / contenue de la route post / creation dun post
    Comment.findOne({ WHERE:{ id: req.params.id,}})
    .then(comment => { // si l'utilisateur et admin il peut modif les utili ou juste l'util modif sont profil
    if (comment.UserId === req.auth.userId ||  req.auth.admin == true ) {
            let newComment = Object.assign(comment,req.body); // remplace le post par le new post (objet,permet d'envoyer des champ vide(recupere un champ)) 
            newComment.save() //sauvegarde le nouveau post
            .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))// retourne la response 200 pour ok pour la methode http , renvoi objet modifier
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));    
            } else {
            res.status(403).json({ message: `vous n'etes pas autoriser a modifiée ce post` });  
        }
    })
    .catch(error => res.status(404).json({ message: `nous faisons face a cette: ${error}` })); 
};
//-------------

//supprimer un Commentaire DELETE
exports.deleteComment = (req, res, next) => {
    // allez le chercher et avoir l'url de l'image pour la supprimer (cherche le produit)
    Comment.findOne({ id: req.params.id })
    //trouver id a celui qui est dans les parametres de la req ,recupere un post (produit) dans le callback (function de rapelle)
    .then((comment) => {// recupere le post dans la base
            if (!comment) { // si le commentaire n'existe pas
                return res.status(404).json({ message: "Le post n'existe pas !"})
            }
            // verifier que seulement la personne qui detient l'objet peu le supprimer
            if (comment.UserId !== req.auth.userId) { //different de req.auth
                return res.status(401).json({ //probleme authentification ,on verifier qu'il appartient bien  a la personne qui effectuer la req
                    error: new Error('Requete non autorisé !')
                });   
            }
            //recuperer l'id des paramettre de route ,si oui on effectue la suppression
            comment.destroy() // supprime le post crée   
            .then(() => res.status(200).json({message: 'Commentaire supprimer !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); // capture l'erreur et renvoi un message erreur (egale error: error)    
        })
        .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
    };
    //-------------
    
    //recuperer un commentaire GET
    exports.getOneComment = (req, res, next) => { 
        let id = req.params.id // avoir acces  dans l'objet req.pams.id
        Comment.findOne( { WHERE:{id: id},//trouver un objet avec WHERE , on pass l'objet en conparaison id  egal le parm de req id
        }) 
        .then(comment => res.status(200).json(comment)) // retourne la response 200 pour ok pour la methode http , renvoi l'objet (un objet)si il existe dans la Bd
        .catch(error => res.status(404).json({ message: `Commentaire non trouvé: ${error}` }));
    }
    //-------------
    
    //recuperer tous les commentaire GET ALL
    exports.getAllComment = (req, res, next) => {    
        //création des objet-----------
        Comment.findAll({include:User}) //recuperer la table user egalement
            .then(comments => res.status(200).json(comments)) // retourne la response 200 pour ok pour la methode http , revoi le tableaux des users recu
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); 
        }
    //-------------

