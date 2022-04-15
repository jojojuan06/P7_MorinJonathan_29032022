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
      // définir l'association ici (relation entre les tables)
      //  Post appartient a un utilisateur (belongTo)
      models.Post.belongsTo(models.User, 
        {
          foreignKey:"userId",
          onDelete: 'cascade', onUpdate:'cascade'
      }) 
      // définir l'association ici (post a plusieur ==> like)
      models.Post.hasMany(models.Like,  
          {foreignKey: "postId"},
          { onDelete: 'cascade' , hooks: true},
          { onUpdate: 'cascade' , hooks: true}
        ); 
      // définir l'association ici (post a plusieur ==> comment)
      models.Post.hasMany(models.Comment,  
        {foreignKey: "postId"},
        { onDelete: 'cascade' , hooks: true},
        { onUpdate: 'cascade' , hooks: true}
      );
    } 
  }
  Post.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:''
    },
    content:{ 
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:''
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
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