'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
    * Méthode d'assistance pour définir des associations.
    * Cette méthode ne fait pas partie du cycle de vie de Sequelize.
    * Le fichier `models/index` appellera cette méthode automatiquement.
    */
    static associate(models) {
      // définir l'association ici (post like)
      models.User.hasMany(models.Post,
        { onDelete: 'cascade' , hooks: true},
      ); //utilisateur a plusieur like (hasMany)
      models.User.hasMany(models.Like,
        { onDelete: 'cascade' , hooks: true},
      );
    }
  }
  User.init({ //valeur par default (model)
    email:DataTypes.STRING,
    name: DataTypes.STRING,
    firstname: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    profile_img: {
      type:DataTypes.STRING,
      defaultValue:''
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
  }, {
    sequelize,
    modelName: 'User',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return User;
};