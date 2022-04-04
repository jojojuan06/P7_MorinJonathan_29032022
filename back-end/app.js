//importation du package d'expresse (npm)
const express =  require('express'); // parse l'objet (une des function remplace bodyparser)
const path = require('path');// Importation de 'Path' afin de definir les chemins
const { xss } = require('express-xss-sanitizer');//nettoie les données d'entrée de l'utilisateur (dans req.body, req.query, req.headers et req.params) 
require('dotenv').config();// proteger les données .env 
const helmet = require('helmet'); // sécurisation injection


// Permet d'importer les routers user, post (enregistrer notre nouveau routeur dans notre fichier app.js)
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comment.js');
//-----------------

// appelle de la methode express (une function) permet de crée une application expresse
const app = express();


//--------Acces serveurs (CORS)

//reponse par default et donc retourn bien notre application on recoit l'objet request response et next pour passez middleware suivant
app.use((req, res, next) => { 
    // qui peut acceder a l'api '*' signifie all tous le monde  a acces au serveur origin
    res.setHeader('Access-Control-Allow-Origin', '*'); //header ajouter un header aux routes  setheader sur nos response 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //autorise certaine header (en tete)sur l'objet requete
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //autorise certaine methode requete
    next();
});

// utilisation du module----------
//acces au corp de la requete (body) et met a disposition dans le corp (acces) sur objet req (body)
app.use(express.json());// intercepte toute les requetes qui on content type json (format) 
app.use(xss());  //nettoie les données d'entrée de l'utilisateur

app.use(helmet()); // helmet

//Gestion des routes principales
// Permet d'accéder aux routes pour les utilisateurs, les publications et les images
app.use('/images', express.static(path.join(__dirname, 'images')));// multer gerer les fichier (image)--- , dire a expresse de servir ce dossier images
app.use('/api/auth', userRoutes); 
app.use('/api/post', postRoutes);
app.use('/api/post', commentRoutes);
//app.use , importer et appliquer a la meme route (contient la logique des routes)
//------------------

// exporter cette application pour y avoir acces depuis les autre fichier (app.js) de notre projet notament le server node
module.exports = app;



