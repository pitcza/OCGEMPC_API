'use strict';
const bcrypt = require('bcryptjs'); // Import bcrypt

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash the passwords before inserting
    const hashedSuperadminPassword = await bcrypt.hash('w=HkoDD6C_', 10);
    const hashedAdminPassword = await bcrypt.hash('P9$xJCX8)@', 10);
    const hashedLoanOfficerPassword = await bcrypt.hash('4KlcP;b#!V', 10);
    const hashedAccountantPassword = await bcrypt.hash('U3Qv15dE6a', 10);
    const hashedManagerPassword = await bcrypt.hash('UUwdAmRuIS', 10);

    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'Super',
          last_name: 'Admin',
          username: 'superadmin',
          email: 'ocgempc@yahoo.com',
          password: hashedSuperadminPassword,
          "createdAt": new Date(),
          "updatedAt": new Date() 
        },
        {
          first_name: 'Admin',
          last_name: 'User',
          username: 'admin',
          email: 'ocgempc050310@gmail.com',
          password: hashedAdminPassword,
          "createdAt": new Date(),
          "updatedAt": new Date() 
        },
        {
          first_name: 'Jyre',
          last_name: 'Bautista',
          username: 'Jyre',
          email: 'bautistajyreyves2705@gmail.com',
          password: hashedLoanOfficerPassword,
          "createdAt": new Date(),
          "updatedAt": new Date() 
        },
        {
          first_name: 'Roma',
          last_name: 'Angela',
          username: 'Roma',
          email: 'romaangela617@gmail.com',
          password: hashedAccountantPassword,
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
         {
          first_name: 'Elisheba',
          last_name: 'Mendoza',
          username: 'Elisheba',
          email: 'elisheba.mendoza@gmail.com',
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
