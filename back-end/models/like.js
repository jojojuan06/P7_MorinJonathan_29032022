'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //console.log(models);
      // définir l'association ici
      //Les associations BelongsTo (appartient),model.user reference
      models.Like.belongsTo(models.Post,{ foreignKey: "postId" , onDelete:"CASCADE",onUpdate:"CASCADE"}); 
      // définir l'association ici (like ==> user appartient plusieur)
      models.Like.belongsTo(models.User,{ foreignKey: "userId" , onDelete:"CASCADE",onUpdate:"CASCADE"});   
      }     
    }
  Like.init({
    userId: DataTypes.INTEGER,
    postId:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Like',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Like;
};