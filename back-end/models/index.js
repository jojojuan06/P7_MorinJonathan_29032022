'use strict';

const fs = require('fs'); //gestion des fichier (image /profil_image)
const path = require('path');
const Sequelize = require('sequelize'); //transcrire le javascript en mysql
const basename = path.basename(__filename); //chercher le nom de mes model
//const config = require(__dirname + '/../config/config.js')[env];
require('dotenv').config();// proteger les données .env (les appelles)
const db = {};

// -----------conexion a la base de donnée mysql -----------// DB_LOGIN_ACCOUNT identifiant utilisateur login du .env
const sequelize = new Sequelize(`${process.env.DATABASE}`, `${process.env.USER}`, `${process.env.PASSWORD}`, {
  host: `${process.env.HOST}`,
  dialect: 'mysql',
  define : { //default interclassement
    charset : 'utf8' , 
    collate : 'utf8_general_ci' ,
    engine: 'InnoDB'  
  } ,
  port: `${process.env.HOST_PORT}`
});
//---------------------

//regarder tous les fichier du dossier model et vas faire des model db + nom du model (import et exporte auto vers autre fichier)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
//verifier tous les models associers
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
//authenticate()fonction pour tester si la connexion est OK
sequelize.authenticate()
.then( async ()=> {
    console.log('\u001b[' + 32 + 'm' + '|---------connexion réussie à la base de donnée----------|' + '\u001b[0m'); //log vert
    //synchronisation des tables(model)
    await sequelize.sync({alter: true}) //force:true (drop table)
    console.log('\u001b[' + 32 + 'm' + '|------synchronisation réussie------|' + '\u001b[0m'); //log vert
}) .catch((error) => {
  console.log('\u001b[' + 31 + 'm' + `|------synchronisation échouée: info--->  ${error}` + '\u001b[0m');  //log rouge
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
