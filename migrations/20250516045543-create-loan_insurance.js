'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('loan_insurances', {
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
      maker_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'makers',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      billing_statement_no: {
          type: Sequelize.STRING,
          allowNull: false
      },
      certificate_no: {
          type: Sequelize.STRING,
          allowNull: false
      },
      status: {
          type: Sequelize.ENUM('new', 'renewal'),
          allowNull: false
      },
      effective_date: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },
      expiry_date: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },
      term: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      annual_premium: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      monthly_premium: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      gross_premium: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      service_fee: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      sum_insured: {
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
     await queryInterface.dropTable('loan_insurances');
  }
};
