'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.js')[env];
require('dotenv').config();// proteger les données .env 
const db = {};

// -----------conexion a la base de donnée mysql -----------// DB_LOGIN_ACCOUNT identifiant utilisateur login du .env
const sequelize = new Sequelize(`${process.env.DATABASE}`, `${process.env.USER}`, `${process.env.PASSWORD}`, {
  host: `${process.env.HOST}`,
  dialect: 'mysql',
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
    console.log('connexion réussie :)');
    await sequelize.sync({alter: true}) //synchronise les tables
    console.log('synchronisation réussie ');
}) .catch((error) => {
    console.log(`connexion échouée  ${error}`);
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
