'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  posts.init({
    users_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    //contenue du text
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};