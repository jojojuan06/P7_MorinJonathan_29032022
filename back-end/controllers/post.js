// CREATE READ UPDATE DELTE POSTS AND LIKE 

//importer acces au systeme de fichier  (action sur une fichier ou dossier)
const fs = require('fs');

//valide et nettoie uniquement les chaînes (validation de l'email)
const validator = require('validator'); 
const { Like, Post, User, Comment} = require('../models')


//Creation d'un post POST
exports.createPost = (req, res, next) => { //function de callback
    //verifier si les champs sont vides (avant submit ,ex name ou description ect..(le front-end n'est pas fiable))
    if (validator.isEmpty(`${req.body.content}`) || 
    validator.isEmpty(`${req.body.title}`)) {
        return res.status(400).json({ message: `les champs ne doivent pas être vide`})    
    }
    //verification du contenue text et image ne sont pas vide
    if (req.body.content && req.body.title == null) { 
        return res.status(400).json({ message : `Votre post doit contenir un titre et du text`})
    } 
    // verifier un nombre de caractere donnée
    if (req.body.title.length <= 4 || req.body.content.length <= 4 ) {
        return res.status(400).json({ message : `Votre post doit contenir au moins 5 caractère`})  
    }
    // verifier un nombre de caractere donnée
    if (req.body.title.length > 30 ) {
        return res.status(400).json({ message : `le titre du post ne doit pas depassez 30 caractère`})  
    }
    // verifier un nombre de caractere donnée
    if (req.body.content.length > 250 ) {
        return res.status(400).json({ message : `le contenue du post ne doit pas depassez 250 caractère`})  
    }
    // creation d'une nouvelle instance  de mon objet post (class) de le req
    const post = new Post({  //recupere mon objet de la req
        title: req.body.title,
        content: req.body.content,
        image: null, //declarer par default
        userId : req.auth.userId  // ajoute id post = userid de la req
    });
    if (req.files) { // si mon fichier dans la req on ajoute 
        const extension = req.files.image[0].mimetype;
        if (extension == "image/jpg" || extension == "image/png" || extension == "image/gif" || extension == "image/webp" || extension == "image/jpeg") {
            post.image = `${req.files.image[0].filename}` //adresse(http ou https) /localhost/nom du fichier 
        } else {
            fs.unlink(`images/${req.files.image[0].filename}`, () => { });
            return res.status(400).json({message: `le format de fichier n'est pas autoriser ${extension}`});
        }
    }
    //si le fichier n'existe pas on sauvegarde le post (definit dans model string vide)
    post.save()//methode save enregistre l'objet dans la base de donnée renvoi une promise
    .then(() => res.status(201).json({ message: 'Votre post est créer !'})) //201 la requête a réussi avec le message
    .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
};
//-------------


//mettre a jour un post PUT
exports.updatePost = (req, res, next) => {
    Post.findOne({ where:{ id: req.params.id,}})
    .then(post => { // si l'utilisateur et admin il peut modif les utili ou juste l'util modif sont profil
        //si post existe pas retourne l'erreur
        if (!post) {
            return res.status(404).json({message: "le poste que vous voulez mettre a jour n'existe pas"});
        }
        if (post.userId === req.auth.userId ||  req.auth.admin == true ) {
            let newPost = Object.assign(post,req.body); // remplace le post par le new post (objet,permet d'envoyer des champ vide(recupere un champ)) 
            if (req.files.image) { //si il y a une img dans la req
                //verification si l'extensions et valid
                const extension = req.files.image[0].mimetype;
                if (extension == "image/jpg" || extension == "image/png" || extension == "image/gif" || extension == "image/webp" || extension == "image/jpeg") {
                    if (post.image != "") { //verifier si le post a deja une image
                        // package fs , unlinke pour supprimer l'image
                        fs.unlink(`images/${post.image}`, () => { });
                    }
                    newPost.image = `${req.files.image[0].filename}` //remplace pas la new img
                }
                else {
                    fs.unlink(`images/${req.files.image[0].filename}`, () => { });
                    return res.status(400).json({message: `le format de fichier n'est pas autoriser ${extension}`});
                }
            }
            newPost.save() //sauvegarde le nouveau post 
            // met a jour et retourne le nouvelle objet
            .then(() => res.status(200).json({ message: 'Post modifié !', post:newPost }))// retourne la response 200 pour ok pour la methode http , renvoi objet modifier
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));    
        } else {
            res.status(403).json({ message: `vous n'etes pas autoriser a modifiée ce post` });  
        }
    })
    .catch(error => res.status(404).json({ message: `nous faisons face a cette: ${error}` })); 
};
//-------------

//supprimer un post DELETE
exports.deletePost = (req, res, next) => {
    // allez le chercher et avoir l'url de l'image pour la supprimer (cherche le produit)
    let id = req.params.id
    Post.findOne({where: { id: id }})
    //trouver id a celui qui est dans les parametres de la req ,recupere un post (produit) dans le callback (function de rapelle)
    .then((post) => {
        // recupere le post dans la base
        if (!post) { // si la post n'existe pas
            return res.status(404).json({ message: "Le post n'existe pas !"})
        }
        // verifier que seulement la personne qui detient l'objet peu le supprimer
        if (post.userId !== req.auth.userId && !req.auth.admin) { //different de req.auth
            //probleme authentification ,on verifier qu'il appartient bien  a la personne qui effectuer la req
            return res.status(401).json({ message:'utilisateur non autorisé !'});   
        }
        if (post.image) { //si l'image existe
            //on supprime l'image
            fs.unlink(`images/${post.image}`, () => {}); 
        }
        //recuperer l'id des paramettre de route ,si oui on effectue la suppression
        post.destroy() // supprime le post crée   
        .then(() => res.status(200).json({message: 'Post supprimé !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
        .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); // capture l'erreur et renvoi un message erreur (egale error: error)    
    })
    .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
};
//-------------

//recuperer un post GET
exports.getOnePost = (req, res, next) => { 
    let id = req.params.id // avoir acces  dans l'objet req.pams.id
    Post.findOne({ where:{id: id},//trouver un objet avec where , on pass l'objet en conparaison id  egal le parm de req id
    include:[
        {
            //recuperation du model user inclu avec des atttributs specifier (ex:evite de donné le Mdp)
            model:User,
            attributes:[
                "id",
                "name",
                "firstname",
                "email",
                "profile_img",
                "admin"
            ]
        },
        {
            model:Comment,
            attributes:[
                "content",
                "id",
                "userId"
            ],
            include: [
                {
                    //recuperation du model user inclu avec des atttributs specifier (ex:evite de donné le Mdp)
                    model:User,
                    attributes:[
                        "name",
                        "firstname",
                        "profile_img",
                    ]
                },
            ]
        },
        {
            model:Like,
            attributes:[
                "postId",
                "id",
                "userId"
            ]
        }
    ]    
}) 
.then(post => {
    //si le commentaire n'existe pas renvoi le message d'erreur
    if (!post) {
        return res.status(404).json({message: `le post n'existe pas`}); //404 ressource non trouvé    
    } else {
        // retourne la response 200 pour ok pour la methode http , renvoi l'objet si il existe dans la Bd
        return res.status(200).json(post);    
    }
}) // retourne la response 200 pour ok pour la methode http , renvoi l'objet (un objet)si il existe dans la Bd
.catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
}
//-------------

//recuperer tous les post GET ALL
exports.getAllPost = (req, res, next) => {    
    //création des objet-----------
    Post.findAll({ include:[
        {
            //recuperation du model user inclu avec des atttributs specifier (ex:evite de donné le Mdp)
            model:User,
            attributes:[
                "id",
                "name",
                "firstname",
                "email",
                "profile_img"
            ]
        },
        {
            model:Comment,
            attributes:[
                "content",
                "id",
                "userId"
            ],
            include: [
                {
                    //recuperation du model user inclu avec des atttributs specifier (ex:evite de donné le Mdp)
                    model:User,
                    attributes:[
                        "firstname",
                        "name",
                        "profile_img"
                    ]
                },
            ]
        },
        {
            model:Like,
            attributes:[
                "postId",
                "id",
                "userId"
            ]
        }
    ]    
})
    .then(posts => res.status(200).json(posts)) // retourne la response 200 pour ok pour la methode http , revoi le tableaux des users recu
    .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); 
}
//------------
