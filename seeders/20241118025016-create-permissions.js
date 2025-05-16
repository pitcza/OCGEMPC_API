'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [
      { permission_name: 'View Loans', "createdAt": new Date(), "updatedAt": new Date() },
      { permission_name: 'Manage Loans', "createdAt": new Date(), "updatedAt": new Date()},
      { permission_name: 'View Logs', "createdAt": new Date(), "updatedAt": new Date() },
      { permission_name: 'View Makers', "createdAt": new Date(), "updatedAt": new Date() },
      { permission_name: 'Manage Profile', "createdAt": new Date(), "updatedAt": new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
