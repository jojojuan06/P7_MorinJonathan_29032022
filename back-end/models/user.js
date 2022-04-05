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
      // définir l'association ici a plusieur post (post)
      models.User.hasMany(models.Post,
        {foreignKey: "userId"},
        { onDelete: 'cascade' , hooks: true},
        { onUpdate: 'cascade' , hooks: true}
      ); 
      //utilisateur a plusieur like (hasMany)
      models.User.hasMany(models.Like,
        {foreignKey: "userId"},
        { onDelete: 'cascade' , hooks: true},
        { onUpdate: 'cascade' , hooks: true}
      );
      //utilisateur a plusieur Comment (hasMany)
      models.User.hasMany(models.Comment,
        {foreignKey: "userId"},
        { onDelete: 'cascade' , hooks: true},
        { onUpdate: 'cascade' , hooks: true}
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
      type:DataTypes.STRING,
      allowNull: false
      
    },
    firstname:{
      type:DataTypes.STRING,
      allowNull: false
    },
    password:{
      type:DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
    profile_img: {
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue:''
    },
    }, {
    sequelize,
    modelName: 'User',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return User;
};