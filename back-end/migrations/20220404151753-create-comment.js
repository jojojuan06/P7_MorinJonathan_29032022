'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        //reference au model crée users (id)
        references:{
        model:'Users', //reference au pluriel pour les appelé (table)
        //identifiant utilisateur
        key:'id'
        }
      },
      postId: {
        type: Sequelize.INTEGER,
         //reference au model crée users (id)
          references:{
          model:'Posts',
          //identifiant utilisateur
          key:'id'
          }
      },
      content: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Comments');
  }
};