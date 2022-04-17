// CREATE READ UPDATE DELTE POSTS AND LIKE 

//valide et nettoie uniquement les chaînes (validation de l'email)
const validator = require('validator'); 
const { User, Comment ,Post} = require('../models')


//Creation d'un Commentaire POST
exports.createComment = (req, res, next) => { //function de callback
Post.findOne({ where: { id: req.body.postId }}) // recherche id du post
    .then(post => {
        if (!post) {
            return res.status(404).json({ message : `Votre post n'existe pas`})
        }
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
        const comment = new Comment({  //recupere mon objet de la req
        content: req.body.content,
        postId: req.body.postId, 
        userId : req.auth.userId  // ajoute id comment = userid de la req
        });
        comment.save()//methode save enregistre l'objet dans la base de donnée renvoi une promise
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !'})) //201 la requête a réussi avec le message
        .catch(error => res.status(400).json({ message: `⚠ Oops, une erreur s\'est produite !${error}`}));
    })
    .catch(error => res.status(500).json({message: `nous faisons face a cette: ${error}` }));
};
//-------------


//mettre a jour d'un Commentaire PUT
exports.updateComment = (req, res, next) => {//exporter une function createuser / contenue de la route post / creation dun post
    Comment.findOne({ where:{ id: req.params.id}})
    .then(comment => { // si l'utilisateur et admin il peut modif les utili ou juste l'util modif sont profil
        if (!comment) { 
            return res.status(404).json({ message: "Le commentaire n'existe pas !"})
        }
        if (comment.userId === req.auth.userId ||  req.auth.admin == true) {
            const newComment = Object.assign(comment,req.body); // remplace le post par le new post (objet,permet d'envoyer des champ vide(recupere un champ)) 
            newComment.save() //sauvegarde le nouveau post
            .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))// retourne la response 200 pour ok pour la methode http , renvoi objet modifier
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));    
        } else {
            res.status(403).json({ message: `vous n'etes pas autoriser a modifiée ce commentaire` });  
        }
    })
    .catch(error => res.status(404).json({ message: `nous faisons face a cette: ${error}` })); 
};
//-------------

//supprimer un Commentaire DELETE
exports.deleteComment = (req, res, next) => {
    // allez le chercher et avoir l'url de l'image pour la supprimer (cherche le produit)
    Comment.findOne({ id: req.params.id })
    //trouver id a celui qui est dans les parametres de la req
    // recupere le post dans la base
    .then((comment) => { 
            // si le commentaire n'existe pas
            if (!comment) { 
                return res.status(404).json({ message: "Le commentaire n'existe pas !"})
            }
            // verifier que seulement la personne qui detient l'objet peu le supprimer ou admin
            if (comment.userId == req.auth.userId ||  req.auth.admin == true) { //different de req.auth
                //recuperer l'id des paramettre de route ,si oui on effectue la suppression
                comment.destroy() // supprime le commentaire   
                .then(() => res.status(200).json({message: 'Commentaire supprimer !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
                .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); // capture l'erreur et renvoi un message erreur (egale error: error)    
            } else {
            // sinon 403 utilisateur non autorisation
            return res.status(403).json({ message: 'utilisateur non autorisé !'});   
            }
        })
        .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
    };
    //-------------
    
    //recuperer un commentaire GET
    exports.getOneComment = (req, res, next) => { 
        let id = req.params.id // avoir acces  dans l'objet req.pams.id
        //trouver un objet avec where , on pass l'objet en conparaison id  egal le parm de req id
        if (Comment == null) {
            return res.status(404).json({message: `Commentaire non trouvé`})
        }
        Comment.findOne( { where:{id: id},
            include:[
                {
                    //recuperation du model user inclu avec des atttributs specifier (ex:evite de donné le Mdp)
                    model:User,
                    attributes:[
                        "name",
                        "firstname",
                        "email",
                        "id"
                    ]
                }
            ]    
        }) 
            .then(comment => {
                //si le commentaire n'existe pas renvoi le message d'erreur
                if (!comment) {
                    return res.status(404).json({message: `le commentaire n'existe pas`}) //404 ressource non trouvé
                }else {
                // retourne la response 200 pour ok pour la methode http , renvoi l'objet si il existe dans la Bd
                return res.status(200).json(comment)
            }
        })
        .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
    }
    //-------------
    
    //recuperer tous les commentaire GET ALL
    exports.getAllComment = (req, res, next) => {    
        //recuperer la table user egalement
        Comment.findAll({include:[
                {
                    model:User,
                    attributes:[
                        "name",
                        "firstname",
                        "email",
                        "id"
                    ]
                }
            ]
        })
            // retourne la response 200 pour ok pour la methode http , revoi le tableaux des users recu
            .then(comments => res.status(200).json(comments)) 
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); 
        }
    //-------------

