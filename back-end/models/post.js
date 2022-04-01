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
    models.Post.belongsTo(models.User, {//model.user reference
        //relation clée etrangere pas egal a null
        foreignKey: {
          allowNull: false
        }}) 
    }
  }
  Post.init({
    users_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};