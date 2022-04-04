// CREATE READ UPDATE DELTE POSTS AND LIKE 

//importer acces au systeme de fichier  (action sur une fichier ou dossier)
const fs = require('fs');

//valide et nettoie uniquement les chaînes (validation de l'email)
const validator = require('validator'); 
const { Like, Post} = require('../models')


//Creation d'un post POST
exports.createPost = (req, res, next) => { //function de callback
    console.log(req.body);
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
    if (title.length <= 4 || content.length <= 4 ) {
        return res.status(400).json({ message : `Votre post doit contenir au moins 4 caractère`})  
    }
    // creation d'une nouvelle instance  de mon objet post (class) de le req
    let post = new Post({  //recupere mon objet de la req
    title: req.body.title,
    content: req.body.content,
    image: req.body.image, 
    likes : 0,
    UserId : req.auth.userId  // ajoute id post = userid de la req
    });
    console.log(post);
    if (req.files) { // si mon fichier dans la req on ajoute
    post.image = `${req.protocol}://${req.get('host')}/images/${req.files.image[0].filename}`//adresse(http ou https) /localhost/nom du fichier    
    } //si le fichier n'existe pas on sauvegarde le post (definit dans model string vide)
    post.save()//methode save enregistre l'objet dans la base de donnée renvoi une promise
    .then(() => res.status(201).json({ message: 'Objet enregistré !'})) //201 la requête a réussi avec le message
    .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
};
//-------------


//mettre a jour un post PUT
exports.updatePost = (req, res, next) => {//exporter une function createuser / contenue de la route post / creation dun post
    Post.findOne({ WHERE:{ id: req.params.id,}})
    .then(post => { // si l'utilisateur et admin il peut modif les utili ou juste l'util modif sont profil
    if (post.UserId === req.auth.userId ||  req.auth.admin == true ) {
            let newPost = Object.assign(post,req.body); // remplace le post par le new post (objet,permet d'envoyer des champ vide(recupere un champ)) 
            if (req.files) { //si il y a une img dans la req
                if (post.image != "") { //verifier si le post a deja une image
                    // package fs , unlinke pour supprimer un fichier (1 arg(chemin fichier , 2 arg(callback vide ,multer demande une function callback)))
                    fs.unlink(`images/${post.image.split('/images/')[1]}`, () => { }); //filename fait reference au dossier image (on suprime)
                }
                newPost.image = `${req.protocol}://${req.get('host')}/images/${req.files.image[0].filename}` //remplace pas la new img
            }
            newPost.save() //sauvegarde le nouveau post
            .then(() => res.status(200).json({ message: 'Post modifié !'}))// retourne la response 200 pour ok pour la methode http , renvoi objet modifier
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
    Post.findOne({ id: req.params.id })
    //trouver id a celui qui est dans les parametres de la req ,recupere un post (produit) dans le callback (function de rapelle)
    .then((post) => {// recupere le post dans la base
            if (!post) { // si la post n'existe pas
                return res.status(404).json({ message: "Le post n'existe pas !"})
            }
            // verifier que seulement la personne qui detient l'objet peu le supprimer
            if (post.UserId !== req.auth.userId) { //different de req.auth
                return res.status(401).json({ //probleme authentification ,on verifier qu'il appartient bien  a la personne qui effectuer la req
                    error: new Error('Requete non autorisé !')
                });   
            }
            if (post.image != "") { //si l'image existe
            //split retourne un tableaux de que qu'il y a avant  /image , apres /image
            const filename = post.imageUrl.split('/images/')[1];//extraire le fichier , recup l'image url du produit retourner par la base,le2eme pour avoir le nom du fichier
            // package fs , unlinke pour supprimer un fichier (1 arg(chemin fichier , 2 arg(callback vide ,multer demande une function callback)))
            fs.unlink(`images/${filename}`, () => {}) //filename fait reference au dossier image
            }
            //recuperer l'id des paramettre de route ,si oui on effectue la suppression
            post.destroy() // supprime le post crée   
            .then(() => res.status(200).json({message: 'Post supprimer !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); // capture l'erreur et renvoi un message erreur (egale error: error)    
        })
        .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
    };
    //-------------
    
    //recuperer un post GET
    exports.getOnePost = (req, res, next) => { 
        let id = req.params.id // avoir acces  dans l'objet req.pams.id
        Post.findOne( { WHERE:{id: id},//trouver un objet avec WHERE , on pass l'objet en conparaison id  egal le parm de req id
        attributes:["email","name","firstname"] //clef que je veut montrer en clair
        }) 
        .then(post => res.status(200).json(post)) // retourne la response 200 pour ok pour la methode http , renvoi l'objet (un objet)si il existe dans la Bd
        .catch(error => res.status(404).json({ message: `post non trouvé: ${error}` }));
    }
    //-------------
    
    //recuperer tous les post GET ALL
    exports.getAllPost = (req, res, next) => {    
        //création des objet-----------
        Post.findAll() 
            .then(posts => res.status(200).json(posts)) // retourne la response 200 pour ok pour la methode http , revoi le tableaux des users recu
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); 
        }
    //-------------



//POST-- LIKE UN POST
exports.likePost = (req, res, next) => { 
    // like de ma req sup a 1 ou inf 0
    if (req.body.like > 1 || req.body.like < 0 ) {
    return res.status(400).json({ message: "requete non autorisé"})    
    }
    else { //sinon on execute le code
    Post.findOne({ WHERE: { id: req.params.id }}) // recherche id du post
    .then(post => {
        if (!post) { // si le post n'existe pas
            return res.status(404).json({ message: "Le post n'existe pas !"})
        } //rechercher poste_id et user_id (de la bd)
        Like.findOne({ WHERE: { UserId: req.auth.userId, PostId: post.id }})
        .then( like => {
        // Différents cas:
        switch (req.body.like) {
            // CAS:le like exist => erreur , si il existe pas on ajoute +1
            case 1:  
            if (like) { 
            return res.status(403).json({ message: "Le like existe deja !"})    
            } else { // au quelle cas je recupere le like du post et je lui ajoute 1
            post.likes++ //j'incremente de 1
            like = new Like ({ //cree mon objet de like
            UserId: req.auth.userId, 
            PostId: post.id 
            })  
            like.save()//sauvegarde du like dans la bdd  
            .then(() => res.status(201).json({ message: 'Post Likée !'}))
            .catch(error => res.status(500).json({message: `nous faisons face a cette: ${error}` }));
            }
            break;
            // CAS: Annulation du like/dislike
            case 0: 
            if (!like) {
                return res.status(403).json({ message: "Le like n'existe pas !"})    
            } else {
            post.likes-- //j'enleve un like
            like.destroy()
            .then(() => res.status(204).json({ message: "le like a etait enlever !"})) //modification d'une ressource (suppresion)
            .catch(error => res.status(500).json({message: `nous faisons face a cette: ${error}` }));   
            }
            break;    
        }})
        post.save() //sauvegarde l'incrementation des likes dans le post
        .then(() => res.status(204).json({ message: "le like a etait enregistré !"}))
        .catch(error => res.status(500).json({ message: `nous faisons face a cette: ${error}` }));
    })
    .catch(error => res.status(500).json({ message: `nous faisons face a cette: ${error}` }));
    }
    
}
