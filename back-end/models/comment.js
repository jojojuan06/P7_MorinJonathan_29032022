'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //console.log(models);
      // définir l'association ici
      //Les associations Belongs-To-Many sont utilisées pour connecter des sources à plusieurs cibles. De plus, les cibles peuvent également avoir des connexions à plusieurs sources.
      models.Comment.belongsTo(models.Post, { //model.user reference
        //relation clée etrangere pas egal a null
        })
        // définir l'association ici (Comment ==> user appartient plusieur)
        models.Comment.belongsTo(models.User,
        );    
      }     
    }
  Comment.init({
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content:{ 
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:''
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};