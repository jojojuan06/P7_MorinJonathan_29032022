'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      users_id: {
        type: Sequelize.INTEGER,
        //reference au model crée users (id)
        references:{
        model:'User',
        //identifiant utilisateur
        key:'id'
        }
      },
      post_id: {
        type: Sequelize.INTEGER,
         //reference au model crée users (id)
          references:{
          model:'Post',
          //identifiant utilisateur
          key:'id'
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }
};