'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
    * Méthode d'assistance pour définir des associations.
    * Cette méthode ne fait pas partie du cycle de vie de Sequelize.
    * Le fichier `models/index` appellera cette méthode automatiquement.
    */
    static associate(models) {
    // définir l'association ici
    //Les associations Belongs-To-Many sont utilisées pour connecter des sources à plusieurs cibles. De plus, les cibles peuvent également avoir des connexions à plusieurs sources.
    models.Post.belongsTo(models.User, { //model.user reference
      //relation clée etrangere pas egal a null
    }) 
    // définir l'association ici (post ==> like a plusieur)
    models.Post.hasMany(models.Like,
        { onDelete: 'cascade' , hooks: true},
      );    
    }
  }
  Post.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content:{ 
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:''
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:''
    },
    likes: {
      type:DataTypes.INTEGER,
      defaultValue:0
    } , 
  }, {
    sequelize,
    modelName: 'Post',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Post;
};