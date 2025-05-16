'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('roles', 
      [
        {
          role_name: 'Encoder',
          role_description: 'Has minimal access to the system such as encoding and viewing loans, makers, etc.',
          "createdAt": new Date(),
          "updatedAt": new Date()
         },
  
       {
        role_name: 'Treasurer',
        role_description: 'Can approve, decline loans and update loan details.',
        "createdAt": new Date(),
        "updatedAt": new Date()
       },
      
       {
        role_name: 'Manager',
        role_description: 'Full access to the system',
        "createdAt": new Date(),
        "updatedAt": new Date()
       },
  
  
      ], {});
    
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('roles', null, {});
     
  }
};
