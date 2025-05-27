'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('roles', 
      [
        {
          role_name: 'Superadmin',
          role_description: 'Full access to the system',
          "createdAt": new Date(),
          "updatedAt": new Date()
        },

        {
          role_name: 'Loan Officer',
          role_description: 'Oversees loan applications, management of makers and data encoding.',
          "createdAt": new Date(),
          "updatedAt": new Date()
         },
  
       {
        role_name: 'Accountant',
        role_description: 'Reviews loans for approval.',
        "createdAt": new Date(),
        "updatedAt": new Date()
       },
        {
        role_name: 'Manager',
        role_description: 'Reviews loans for approval.',
        "createdAt": new Date(),
        "updatedAt": new Date()
       },
      
   
  
  
      ], {});
    
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('roles', null, {});
     
  }
};
