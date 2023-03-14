'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('status', [
      { 
        id_status: '1',
        nama_status: "aktif"
      },
      { 
        id_status: '2',
        nama_status: "tdk aktif"
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status', null, {});
  }
};
