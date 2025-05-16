'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('loan_comakers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      loan_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model:'loan_applications',
        key:'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
      },
      comaker_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'comakers',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('loan_comakers');
  }
};
