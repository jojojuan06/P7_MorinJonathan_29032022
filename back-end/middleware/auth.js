//protéger les routes sélectionnées et vérifiera que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes.

// package verification require
const jwt = require('jsonwebtoken'); //crée des token et les verifier
require('dotenv').config({ path:'../.env' }); // proteger les donnée , adresse (path: chemin) du .env pour le process
//exportation d'un middleware
module.exports = (req, res, next) => {
    //permet de capturer plusieurs erreurs (verifie) 
    try {
        //si il trouve pas req.headers.auth return l'erreur
        if (!req.headers.authorization) {
        throw 'Utilisateur non authentifié !'; 
        }
        //split divise une chaîne de caractères en une liste ordonnée de sous-chaînes, place ces sous-chaînes dans un tableau et retourne le tableau.
        const token = req.headers.authorization.split(' ')[1];  //retourner un tableau bearer  1 element , token 2 element (que l'on recupere)
        //decoder le token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY ); // function pour verifier le token et le token deja crée dans le  .env
        //recuperer le admin a partir du token
        const admin = decodedToken.admin 
        //recuperer le userid a partir du token
        const userId = decodedToken.userId; 
        //attacher le auth sur ma req pour utiliser dans les controller
        req.auth = { userId , admin} ; 
        // verifier que la requete correspond a celle du token
        // si userid dans le corp de la req et que celuici et different de userId
        if (req.body.userId && req.body.userId !== userId)  {
            throw 'User iD non valable !'; //pour renvoyer l'erreur
        } else { //si tout vas bien
            next(); // on pass la req au middleware suivant (si auth est correct, pass au mid suivant ex multer)
        }
    } catch (error) {
        res.status(401).json({ error: error || 'Requete non authentifiée !' })  // '||' signifier ou (sinon) sur un autre erreur le msg
    };
}