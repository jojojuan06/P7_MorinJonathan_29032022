// CREATE READ UPDATE DELTE POSTS AND LIKE 

//importer acces au systeme de fichier  (action sur une fichier ou dossier)
const fs = require('fs');

//valide et nettoie uniquement les chaînes (validation de l'email)
const validator = require('validator'); 
const db = require('../models/index')






//Creation d'un post POST
exports.createPost = (req, res, next) => { //function de callback
//Le corps de la requête contient une chaîne donc on doit le parse
    const postObject = JSON.parse(req.body.post);//extraire l'objet json (l'objet post de la requête)
    //verifier si les champs sont vides (avant submit ,ex name ou description ect..(le front-end n'est pas fiable))
    if (validator.isEmpty(`${postObject.name}`) || 
        validator.isEmpty(`${postObject.manufacturer}`) ||
        validator.isEmpty(`${postObject.description}`) ||
        validator.isEmpty(`${postObject.mainPepper}`)){
        return res.status(400).json({ message: `les champs ne doivent pas être vide`})    
    } 
    // creation d'une nouvelle instance  de mon objet post (class) de le req
    const post = new Post({ ...postObject,// operateur spread (...) vas copier les champ de l'objet , dans le corp de la request 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,//adresse(http ou https) /localhost/nom du fichier
    likes : 0,//valeur par default
    });
    post.save()//methode save enregistre l'objet dans la base de donnée renvoi une promise
    .then(() => res.status(201).json({ message: 'Objet enregistré !'})) //201 la requête a réussi avec le message
    .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
};


//-------------


//mettre a jour un post PUT
exports.modifyPost = (req, res, next) => {//exporter une function createuser / contenue de la route post / creation dun post
    db.Post.findOne({ WHERE:{ id: req.params.id,}})
    .then(user => { // si l'utilisateur et admin il peut modif les utili ou juste l'util modif sont profil
    if (user.id === req.auth.userId ||  req.auth.admin == true ) {
        //test le cas de figure ou on se trouve
        const postObject = req.file ?//si req.file exist (ternaire)
            {
            ...JSON.parse(req.body.user),//si il exist il faut le prendre en compte  l'ojet du produit
            //on genere une nouvelle image url
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//adresse de l'image en interpolation 
            } : { ...req.body };//sinon il n'exite pas on copie l'objet (corp de la requete)
            db.User.updateOne({ WHERE: { id: req.params.id }}, // egale (clée -> valeur) dans la base de donnée (trouver avec where)
            { ...postObject, id: req.params.id })//pour correspondre a l'id des param de la req et dire que l'id corespond a celui des paramettre (mettre a jour son produit)
            //spread pour recuperer le user (produit) qui est dans le corp de la requete que l'on a cree et on modifier sont identifiant
            .then(() => res.status(200).json({ message: 'Objet modifié !'}))// retourne la response 200 pour ok pour la methode http , renvoi objet modifier
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
    db.Post.findOne({ id: req.params.id })
    //trouver id a celui qui est dans les parametres de la req ,recupere un post (produit) dans le callback (function de rapelle)
    .then((post) => {// recupere le post dans la base
        if (!post) { // si la post n'existe pas
            return res.status(404).json({ message: "Le post n'existe pas !"})
        }
        // verifier que seulement la personne qui detient l'objet peu le supprimer
        if (user.userId !== req.auth.userId) { //different de req.auth
                return res.status(401).json({ //probleme authentification ,on verifier qu'il appartient bien  a la personne qui effectuer la req
                    error: new Error('Requete non autorisé !')
                });   
            }
            //split retourne un tableaux de que qu'il y a avant  /image , apres /image
            const filename = post.imageUrl.split('/images/')[1];//extraire le fichier , recup l'image url du produit retourner par la base,le2eme pour avoir le nom du fichier
            // package fs , unlinke pour supprimer un fichier (1 arg(chemin fichier , 2 arg(callback apres supprimer)))
            return fs.unlink(`images/${filename}`, () => { //filename fait reference au dossier image
                //recuperer l'id des paramettre de route ,si oui on effectue la suppression
                return db.Post.deleteOne({_id: req.params.id }) // egale (clée -> valeur) function pour supprimer un users (produit) dans la base de donnée    
                .then(() => res.status(200).json({message: 'Post supprimer !'})) // retourne la response 200 pour ok pour la methode http , renvoi objet modifier
                .catch(error => res.status(400).json({ error })); // capture l'erreur et renvoi un message erreur (egale error: error)   
            }); 
        })
        .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
    };
    //-------------
    
    //recuperer un post GET
    exports.getOnePost = (req, res, next) => { 
        req.params.id // avoir acces  dans l'objet req.pams.id
        db.Post.findOne( { WHERE:{id: req.params.id},//trouver un objet avec WHERE , on pass l'objet en conparaison _id  egal le parm de req id
        attributes:["email","name","firstname"] //clef que je veut montrer en clair
        }) 
        .then(post => res.status(200).json(post)) // retourne la response 200 pour ok pour la methode http , renvoi l'objet (un objet)si il existe dans la Bd
        .catch(error => res.status(404).json({ message: `post non trouvé: ${error}` }));
    }
    //-------------
    
    //recuperer tous les post GET ALL
    exports.getAllPost = (req, res, next) => {    
        //création des objet-----------
        db.Post.find() //trouve la liste d'objet (find) qui nous retourne une promise , envoi un tableau contenant tous les users dans notre base de données
            .then(users => res.status(200).json(users)) // retourne la response 200 pour ok pour la methode http , revoi le tableaux des users recu
            .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); 
        }
    //-------------



    // POST-- LIKE UN POST
exports.likePost = (req, res, next) => {
    const userId = req.body.userId; // chercher user id dans le corp de la requete
    const like = req.body.like; // chercher like dans le corp de la requete
    const postId = req.params.id;// chercher id de la post dans le corp de la requete
    db.Post.findOne({ WHERE: { id: postId }})
    .then(post => {
        if (!post) { // si le post n'existe pas
            return res.status(404).json({ message: "Le post n'existe pas !"})
        }
        // nouvelles valeurs à modifier
        const newValues = { 
            usersLiked: post.usersLiked, 
            likes: 0 } // mais zero par default
        // Différents cas:
        switch (like) {
            case 1:  // CAS: post liked
            if (newValues.usersLiked.includes(req.auth.userId) ) { //si userlikes inclus user id descrypter avec le token alors on eux peu pas fait d'action (et pas deja like)
                return res.status(403).json({ message: 'Requete non autorisé !'}) //indique qu'un serveur comprend la requête mais refuse de l'autoriser.
            }
            newValues.usersLiked.push(userId);  //dans le cas ajouter un like
            break;
            // CAS: Annulation du like/dislike
            case 0:  
            // si userlike  et user dislike (n'a pas fait d'action) n'inclue pas  userid authentifier alors tu n'est pas autoriser
            if (!newValues.usersLiked.includes(req.auth.userId)) { 
                return res.status(403).json({ message: 'Requete non autorisé !'}) 
            }
            //include cherche dans un tableaux zero             
            if (newValues.usersLiked.includes(userId)) { 
            // si on annule le like
            const index = newValues.usersLiked.indexOf(userId); // renvoie le premier indice pour lequel on trouve un élément donné 
            newValues.usersLiked.splice(index, 1); //modifie le contenu d'un tableau en retirant des éléments et/ou en ajoutant 
            } 
            break;    
        };
        // Calcul du nombre de likes 
        newValues.likes = newValues.usersLiked.length;    
        // Mise à jour de la post avec les nouvelles valeurs
        db.Post.updateOne({ id: postId }, newValues)    
        .then(() => res.status(200).json({ message: 'post notée !' }))    
        .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` })); 
    })   
    .catch(error => res.status(500).json({ message: `nous faisons face a cette: ${error}` }));    
}

