// CREATE READ UPDATE DELTE POSTS AND LIKE 

//valide et nettoie uniquement les chaînes (validation de l'email)
const validator = require('validator'); 
const { Post, Like,User } = require('../models')

//creation d'un like Post
exports.createLike = (req, res, next) => { 
        Post.findOne({ where: { id: req.params.id }}) // recherche id du post
        .then(post => {
            if (!post) { // si le post n'existe pas
                return res.status(404).json({ message: "Le post n'existe pas !"})
            } //rechercher poste_id et user_id (de la bd)
            post.increment('likes') //ajoute un like
            post.save()
            Like.findOne({ where: { userId: req.auth.userId, postId: post.id }})
            .then( like => {
                if (like) { //erreur (409) conflit , req ne peut etre traité
                    return res.status(409).json({ message : 'Vous avez deja liké se posts !'}) 
                }
                like = new Like ({ //cree mon objet de like
                    userId: req.auth.userId, //id de l'utilisateur
                    postId: post.id, //id du post
                })
                console.log("info-->", like);  
                like.save()//sauvegarde ajout du like 
                .then(() => res.status(201).json({ message: 'Post Likée !'}))
                .catch(error => res.status(500).json({message: `nous faisons face a cette: ${error}` }));
            })
        }).catch(error => res.status(500).json({message: `nous faisons face a cette: ${error}` }))
    }    


//mettre a jour d'un Like PUT
exports.updateLike = (req, res, next) => {//exporter une function createuser / contenue de la route post / creation dun post
    Like.findOne({ where:{ id: req.params.id,}})
    .then(like => { // si l'utilisateur et admin il peut modif les utili ou juste l'util modif sont profil
        if (!like) { // si le like n'existe pas
            return res.status(404).json({ message: "Le like n'existe pas !"})
        }
        if (like.userId === req.auth.userId) {
            let newLike = Object.assign(like,req.body); // remplace le post par le new post (objet,permet d'envoyer des champ vide(recupere un champ)) 
            newLike.save() //sauvegarde le nouveau post
            .then(() => res.status(200).json({ message: 'Like modifié !'}))// retourne la response 200 pour ok pour la methode http , renvoi objet modifier
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));    
            } else {
            res.status(403).json({ message: `vous n'etes pas autoriser a modifiée ce like` });  
        }
    })
    .catch(error => res.status(404).json({ message: `nous faisons face a cette: ${error}` })); 
};
//-------------

//supprimer un Like DELETE
exports.deleteLike = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id }}) // recherche id du post
    .then(post => {
        if (!post) { // si le post n'existe pas
            return res.status(404).json({ message: "Le post n'existe pas !"})
        }
        if(post.likes == 0) {
            console.log(post.likes);
            return res.status(404).json({ message: "Veuillez liker le post avant de supprimer le like !"})
        }
        else {
            post.decrement('likes') //enleve un like
            post.save()
            // allez le chercher et avoir l'url de l'image pour la supprimer (cherche le produit)
            Like.findOne({ id: req.params.id })
            //trouver id a celui qui est dans les parametres de la req ,recupere un post (produit) dans le callback (function de rapelle)
            // recupere le post dans la base
            .then((like) => {
                if (!like) { // si le like n'existe pas
                    return res.status(404).json({ message: "Le like n'existe pas !"})
                }
                // verifier que seulement la personne qui detient l'objet peu le supprimer
                if (like.userId !== req.auth.userId) { //different de req.auth
                    //probleme authentification ,on verifier qu'il appartient bien  a la personne qui effectuer la req
                    return res.status(401).json({ message: 'Requete non autorisé !'});   
                }
                //recuperer l'id des paramettre de route ,si oui on effectue la suppression
                like.destroy() // supprime le post crée   
                .then(() => res.status(200).json({message: 'Like supprimer !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
                .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); // capture l'erreur et renvoi un message erreur (egale error: error)    
            })
            .catch(error => res.status(500).json({ message: `nous faisons face a cette: ${error}` }));    
        } 
        
    }).catch(error => res.status(500).json({ message: `nous faisons face a cette: ${error}` }));
};
    //-------------
    
    //recuperer un like GET
    exports.getOneLike = (req, res, next) => { 
        let id = req.params.id // avoir acces  dans l'objet req.pams.id
        Like.findOne( { where:{id: id},//trouver un objet avec where , on pass l'objet en conparaison id  egal le parm de req id
        }) 
        .then(like => res.status(200).json(like)) // retourne la response 200 pour ok pour la methode http , renvoi l'objet (un objet)si il existe dans la Bd
        .catch(error => res.status(404).json({ message: `Like non trouvé: ${error}` }));
    }
    //-------------
    
    //recuperer tous les like GET ALL
    exports.getAllLike = (req, res, next) => {    
        //création des objet-----------
        Like.findAll({include:User}) //recuperer la table user egalement
            .then(likes => res.status(200).json(likes)) // retourne la response 200 pour ok pour la methode http , revoi le tableaux des users recu
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); 
        }
    //-------------