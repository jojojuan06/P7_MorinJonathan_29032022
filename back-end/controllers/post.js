// CREATE READ UPDATE DELTE POSTS AND LIKE 

//importer acces au systeme de fichier  (action sur une fichier ou dossier)
const fs = require('fs');

//valide et nettoie uniquement les chaînes (validation de l'email)
const validator = require('validator'); 
const db = require('../models/index')






//Creation d'un post POST
exports.createUser = (req, res, next) => { //function de callback
    //Le corps de la requête contient une chaîne donc on doit le parse
    const userObject = JSON.parse(req.body.user);//extraire l'objet json (l'objet user de la requête)
    //verifier si les champs sont vides (avant submit ,ex name ou description ect..(le front-end n'est pas fiable))
    if (validator.isEmpty(`${userObject.name}`) || 
        validator.isEmpty(`${userObject.manufacturer}`) ||
        validator.isEmpty(`${userObject.description}`) ||
        validator.isEmpty(`${userObject.mainPepper}`)){
        return res.status(400).json({ message: `les champs ne doivent pas être vide`})    
    }
    //body correspond au model de l'objet que l'on envoi 
    const user = new User({/* creation d'une nouvelle instance  de mon objet user (class) de le req*/  
    ...userObject,// operateur spread (...) vas copier les champ de l'objet , dans le corp de la request 
    //http ou https puis le host de notre server (localhost:3000), la racine du serveur
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,//adresse de l'image en interpolation  host(nom de domaine ou ad ip)
    likes : 0,//valeur par default
    });
    user.save()//methode save enregistre l'objet dans la base de donnée renvoi une promise
    .then(() => res.status(201).json({ message: 'Objet enregistré !'})) //201 la requête a réussi avec le message
    .catch(error => res.status(400).json({ message: `nous faisons face a cette: ${error}` }));
};


//-------------

//recuperer un post GET



//-------------

//recuperer tous les post GET ALL



//-------------

//mettre a jour un post PUT



//-------------

//supprimer un post DELETE



//-------------

