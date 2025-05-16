'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('comakers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      co_first_name: {
      type: Sequelize.STRING,
      allowNull: false,
      },
      co_middle_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      co_last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      co_ext_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      co_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      co_phone_num: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      co_birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      co_age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      co_dept: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      co_position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      co_salary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      co_ee_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      co_years_coop: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      co_share_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      co_saving_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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
     await queryInterface.dropTable('comakers');
  }
};
