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
    email:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      allowNull: false,
      type:DataTypes.STRING
      
    },
    firstname:{
      allowNull: false,
      type:DataTypes.STRING
    },
    password:{
      allowNull: false,
      type:DataTypes.STRING
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
    profile_img: {
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue:'C:\Users\jonh0\Desktop\GitHub\P7_MorinJonathan_29032022\back-end\images\image_default_profile.png'
    },
    }, {
    sequelize,
    modelName: 'User',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return User;
};