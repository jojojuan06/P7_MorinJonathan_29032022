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
      //Les associations BelongsTo (appartient)
      models.Like.belongsTo(models.Post);//model.user reference { foreignKey: postId }
      // définir l'association ici (like ==> user appartient plusieur)
      models.Like.belongsTo(models.User);//{ foreignKey: userId }    
      }     
    }
  Like.init({
  }, {
    sequelize,
    modelName: 'Like',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  });
  return Like;
};