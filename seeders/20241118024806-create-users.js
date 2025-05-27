'use strict';
const bcrypt = require('bcryptjs'); // Import bcrypt

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash the passwords before inserting
    const hashedEncoderPassword = await bcrypt.hash('password', 10);
    const hashedTreasurerPassword = await bcrypt.hash('password', 10);
    const hashedManagerPassword = await bcrypt.hash('password', 10);

    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'Super',
          last_name: 'Admin',
          username: 'superadmin',
          email: '202110888@gordoncollege.edu.ph',
          password: hashedEncoderPassword,
          "createdAt": new Date(),
          "updatedAt": new Date() 
        },
        {
          first_name: 'Loan',
          last_name: 'Officer',
          username: 'loanofficer',
          email: '202110211@gordoncollege.edu.ph',
          password: hashedTreasurerPassword,
          "createdAt": new Date(),
          "updatedAt": new Date() 
        },
        {
          first_name: 'Sample',
          last_name: 'Accountant',
          username: 'accountant',
          email: '202011123@gordoncollege.edu.ph',
          password: hashedManagerPassword,
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
